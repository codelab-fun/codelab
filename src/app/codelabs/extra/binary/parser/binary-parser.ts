import { BinaryObjectParser } from './parsers/object-parser';
import { StringParser } from './parsers/string-parser';
import { BinaryChoiceParser } from './parsers/choice-parser';
import { BinaryArrayParser } from './parsers/array-parser';
import { BitParser } from './parsers/bit-parser';
import { FirstBitParser } from './parsers/first-bit-parser';
import { BinaryReader } from './readers/abstract-reader';

export class BinaryParser {
  type = 'object';
  z
  private parser: BinaryObjectParser;

  constructor() {
    this.parser = new BinaryObjectParser();
  }

  string(name: string, config: any) {
    this.parser.addStep(name, new StringParser(config));
    return this;
  }

  firstBit(name: string, config: any = {}) {
    this.parser.addStep(name, new FirstBitParser(config));
    return this;
  }

  choice(name: string, config: any) {
    this.parser.addStep(name, new BinaryChoiceParser({...config}));
    return this;
  }

  array(name: string, config: any) {
    this.parser.addStep(name, new BinaryArrayParser({...config}));
    return this;
  }

  bit(name: string, config: any) {
    this.parser.addStep(name, new BitParser({...config}));
    return this;
  }

  block(name: string, parser) {
    this.parser.addStep(name, parser);
    return this;
  }

  bit1(name: string) {
    return this.bit(name, {length: 1});
  }

  bit2(name: string) {
    return this.bit(name, {length: 2});
  }

  bit3(name: string) {
    return this.bit(name, {length: 3});
  }

  bit8(name: string) {
    return this.bit(name, {length: 8});
  }

  bit32(name: string) {
    return this.bit(name, {length: 32});
  }

  object(name: string) {
    return this.bit(name, {length: 1});
  }

  uInt16(name: string) {
    return this.bit(name, {
      type: 'number',
      length: 16, converter: (a) => {
        return parseInt(a.slice(8) + a.slice(0, 8), 2);
      }
    });
  }

  uInt24(name: string, config: any = {}) {
    return this.bit(name, {
      type: 'number',
      length: 24,
      converter: (a) => {
        return parseInt(a, 2);
      },
      ...config
    });
  }

  uInt32(name: string) {
    return this.bit(name, {
      type: 'number',
      length: 32, converter: (a) => {
        return parseInt(a, 2);
      }
    });
  }

  uInt8(name: string) {
    return this.bit(name, {
      type: 'number',
      length: 8, converter: (a) => {
        return parseInt(a, 2);
      }
    });
  }

  hex(name: string, config: any = {}) {
    if (typeof config.length === 'function') {
      debugger;
      //TODO
    }

    return this.bit(name, {
      type: 'hex',
      converter: (data) => {
        return Array.from(data.match(/.{4}/g)).map(a => parseInt(a.toString(), 2)).map(a => a.toString(16)).join('')
      },
      ...config,
      length: config.length * 4,
    });

  }

  read(reader, data: any = {}) {
    return this.parser.read(reader, data);
  }

  readOrdered(reader: BinaryReader, data: any = [], start = 0) {
    return {
      start: start,
      ...this.parser.readOrdered(reader, data, start)
    };
  }
}
