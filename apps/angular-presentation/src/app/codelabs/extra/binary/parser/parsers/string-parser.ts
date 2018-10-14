import { AbstractBinaryParser } from './abstract-parser';
import { BinaryReader, BinaryReaderResult } from '../readers/abstract-reader';
import { resolveFunctionOrvalue } from '../utils';

function bytesToChar(a) {
  return String.fromCharCode(parseInt(a, 2));
}

export class StringParser extends AbstractBinaryParser {
  type = 'string';

  constructor(private config) {
    super();
  }

  read(reader: BinaryReader, data: BinaryReaderResult = {}, start = 0): BinaryReaderResult {
    if (this.config.readUntil) {
      let value = '';
      let rawValue = '';

      while (reader.peak(this.config.readUntil.length) !== this.config.readUntil && reader.peak(this.config.readUntil.length) > 0) {
        const letter = reader.read(8);
        value += bytesToChar(letter);
        rawValue += letter;
      }

      return {value, rawValue};
    } else {
      const len = resolveFunctionOrvalue(this.config.length, data) * 8;
      const rawValue = reader.read(len);
      const value = rawValue.match(/.{8}/g).map(bytesToChar).join('');
      return {value, rawValue};
    }
  }

  readOrdered(reader: BinaryReader, data: BinaryReaderResult = {}, start = 0): BinaryReaderResult {
    const result = this.read(reader, data);
    const length = start + result.rawValue.length;
    const end = start + length;
    return {...result, type: this.type, start, end, length};
  }
}
