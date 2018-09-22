import { AbstractBinaryParser } from './abstract-parser';
import { BinaryReader, BinaryReaderResult } from '../readers/abstract-reader';
import { resolveFunctionOrvalue } from '../utils';


export class BitParser extends AbstractBinaryParser {
  type = 'bits';

  constructor(private config) {
    super();
    this.type = config.type || this.type;
  }

  read(reader: BinaryReader, data: BinaryReaderResult = {}): BinaryReaderResult {
    const len = resolveFunctionOrvalue(this.config.length, data);
    const rawValue = reader.read(len);
    const converter = this.config.converter || (a => a);
    return {value: converter(rawValue), rawValue};
  }

  readOrdered(reader: BinaryReader, data: BinaryReaderResult = {}, start = 0): BinaryReaderResult {
    if (start === 0) {
      debugger;
    }
    const result = this.read(reader, data);
    const length = result.rawValue.length;
    const end = start + length;
    return {start, length, end, ...result, type: this.type, unconverter: this.config.unconverter};
  }
}
