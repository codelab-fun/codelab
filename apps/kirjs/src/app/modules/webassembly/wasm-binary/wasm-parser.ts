import { BinaryParser } from '../../binary/parser/binary-parser';

const funcTypes = {
  0x7f: 'i32',
  0x7e: 'i64',
  0x7d: 'f32',
  0x7c: 'f64',
  0x70: 'anyfunc',
  0x60: 'func',
  0x40: 'empty_block'
};

const valueTypes = {
  0x7f: 'i32',
  0x7e: 'i64',
  0x7d: 'f32',
  0x7c: 'f64'
};

export function wasmParser() {
  const funcParamTypeParser = new BinaryParser().uInt8('type', {
    enum: valueTypes
  });

  const funcTypeParser = new BinaryParser()
    .uInt8('type', { enum: funcTypes })
    .uInt8('paramCount')
    .array('params', {
      parser: funcParamTypeParser,
      length: 'paramCount'
    })
    .uInt8('returnCount')
    .array('returns', {
      parser: funcParamTypeParser,
      length: 'returnCount'
    });

  const fieldParser = new BinaryParser()
    .varuint7('len')
    .string('name', { length: 'len' });

  const kindParser = new BinaryParser().uInt8('kind').choice('declaration', {
    key: 'kind',
    values: {
      0: new BinaryParser().varuint7('function'),
      2: new BinaryParser().varuint7('memory-tbd')
    }
  });

  const exportItemParser = new BinaryParser()
    .block('field', fieldParser)
    .block('kind', kindParser);

  const localEntryParser = new BinaryParser()
    .varuint7('local_count')
    .uInt8('value_type');

  const codeBodyParser = new BinaryParser()
    .varuint7('function_body_type_body_size')
    .block('local', localEntryParser)
    .block('local', localEntryParser)
    .block('local', localEntryParser)
    .block('local', localEntryParser);

  const sectionParsers = {
    type: new BinaryParser().uInt8('count').array('params', {
      length: 'count',
      parser: funcTypeParser
    }),

    import: new BinaryParser()
      .uInt8('count')
      .varuint7('moduleLen')
      .string('module', { length: 'moduleLen' })
      .block('field', fieldParser)
      .block('kind', kindParser),

    function: new BinaryParser().bit32('TBD'),

    table: new BinaryParser().bit24('TBD'),

    export: new BinaryParser().varuint7('count').array('items', {
      length: 'count',
      parser: exportItemParser
    }),

    start: new BinaryParser().varuint7('index'),

    code: new BinaryParser()
      .varuint7('number_of_functions')
      .block('lol', codeBodyParser)
  };

  const sectionParser = new BinaryParser()
    .uInt8('section-type', {
      enum: {
        0x01: 'Types',
        0x02: 'Import',
        0x03: 'Function',
        0x05: 'Table',
        0x07: 'Export',
        0x08: 'Start',
        0x0a: 'Code'
      }
    })
    .varuint7('size')
    .choice('section', {
      key: 'section-type',
      values: {
        0x01: sectionParsers.type,
        0x02: sectionParsers.import,
        0x03: sectionParsers.function,
        0x05: sectionParsers.table,
        0x07: sectionParsers.export,
        0x08: sectionParsers.start,
        0x0a: sectionParsers.code
      }
    });

  const header = new BinaryParser()
    .string('headerConst', {
      length: 4,
      description: `header const`
    })
    .uInt32le('version')
    .array('sections', { length: 7, parser: sectionParser });

  return new BinaryParser().block('header', header);
}
