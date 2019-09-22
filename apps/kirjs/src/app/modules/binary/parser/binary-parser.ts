import { BinaryObjectParser } from './parsers/object-parser';
import { StringParser, StringParserConfig } from './parsers/string-parser';
import { BinaryChoiceParser } from './parsers/choice-parser';
import { BinaryArrayParser } from './parsers/array-parser';
import { BitParser } from './parsers/bit-parser';
import { VarUintParser, VarUintParserConfig } from './parsers/var-uint-parser';
import { BinaryReader } from './readers/abstract-reader';
import { beToLe32 } from './parsers/common';

export interface BaseConfig {
  description?: string;
  length?: number;
  type?: string;
  converter?: (a: string) => number;
  enum?: { [key: string]: string };
}

export class BinaryParser {
  type = 'object';
  private parser: BinaryObjectParser;

  constructor() {
    this.parser = new BinaryObjectParser();
  }

  string(name: string, config: StringParserConfig) {
    this.parser.addStep(name, new StringParser(config));
    return this;
  }

  varuint7(name: string, config: Partial<VarUintParserConfig> = {}) {
    this.parser.addStep(name, new VarUintParser(config));
    return this;
  }

  varuint31(name: string, config: Partial<VarUintParserConfig> = {}) {
    this.parser.addStep(
      name,
      new VarUintParser({
        ...config,
        size: 31
      })
    );
    return this;
  }

  choice(name: string, config: any) {
    this.parser.addStep(name, new BinaryChoiceParser({ ...config }));
    return this;
  }

  array(name: string, config: any) {
    this.parser.addStep(name, new BinaryArrayParser({ ...config }));
    return this;
  }

  bit(name: string, config: any) {
    this.parser.addStep(name, new BitParser({ ...config }));
    return this;
  }

  block(name: string, parser) {
    this.parser.addStep(name, parser);
    return this;
  }

  constBits(value, config?: Partial<BaseConfig>) {
    return this.bit('const', {
      length: value.length,
      type: 'const',
      ...config
    });
  }

  boolean(name: string, config?: Partial<BaseConfig>) {
    return this.bit(name, { length: 1, type: 'boolean', ...config });
  }

  bit1(name: string, config?: Partial<BaseConfig>) {
    return this.bit(name, { length: 1, ...config });
  }

  bit2(name: string, config?: Partial<BaseConfig>) {
    return this.bit(name, { length: 2, ...config });
  }

  bit3(name: string, config?: Partial<BaseConfig>) {
    return this.bit(name, { length: 3, ...config });
  }

  bit8(name: string, config?: Partial<BaseConfig>) {
    return this.bit(name, { length: 8, ...config });
  }

  bit32(name: string, config?: Partial<BaseConfig>) {
    return this.bit(name, { length: 32, ...config });
  }
  bit24(name: string, config?: Partial<BaseConfig>) {
    return this.bit(name, { length: 24, ...config });
  }

  object(name: string, config?: Partial<BaseConfig>) {
    return this.bit(name, { length: 1, ...config });
  }

  uInt16(name: string, config?: Partial<BaseConfig>) {
    return this.bit(name, {
      type: 'number',
      length: 16,
      converter: a => {
        return parseInt(a.slice(8) + a.slice(0, 8), 2);
      },
      ...config
    });
  }

  uInt24(name: string, config: any = {}) {
    return this.bit(name, {
      type: 'number',
      length: 24,
      converter: a => {
        return parseInt(a, 2);
      },
      ...config
    });
  }

  uInt32(name: string, config?: Partial<BaseConfig>) {
    return this.bit(name, {
      type: 'number',
      length: 32,
      converter: a => {
        return parseInt(a, 2);
      },
      ...config
    });
  }

  uInt32le(name: string, config?: Partial<BaseConfig>) {
    return this.uInt32(name, {
      converter: a => {
        return beToLe32(parseInt(a, 2));
      },
      ...config
    });
  }

  uInt8(name: string, config?: Partial<BaseConfig>) {
    return this.bit(name, {
      type: 'number',
      subtype: 'uint8',
      length: 8,
      converter: a => {
        return parseInt(a, 2);
      },
      ...config
    });
  }

  hex(name: string, config?: Partial<BaseConfig>) {
    if (typeof config.length === 'function') {
      // tslint:disable-next-line:no-debugger
      debugger;
      // TODO
    }

    return this.bit(name, {
      type: 'hex',
      converter: data => {
        return Array.from(data.match(/.{4}/g))
          .map(a => parseInt(a.toString(), 2))
          .map(a => a.toString(16))
          .join('');
      },
      ...config,
      length: config.length * 4
    });
  }

  read(reader, data: any = {}) {
    return this.parser.read(reader, data);
  }

  readOrdered(reader: BinaryReader, data: any = [], start = 0) {
    const v = this.parser.readOrdered(reader, data, start);

    return {
      start: start,
      ...v
    };
  }
}
