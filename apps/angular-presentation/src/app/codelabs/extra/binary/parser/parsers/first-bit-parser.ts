import { AbstractBinaryParser } from './abstract-parser';
import { BinaryReader, BinaryReaderResult } from '../readers/abstract-reader';


export class FirstBitParser extends AbstractBinaryParser {
  type = 'bits';

  constructor(private config: any = {}) {
    super();
    this.type = config.type || this.type;
  }

  converter(n: string) {
    return parseInt(n, 2);
  }

  read(reader: BinaryReader, data: BinaryReaderResult = {}): BinaryReaderResult {
    let hasNext = true;
    let value = '';
    let rawValue = '';

    let i = 100;
    while (hasNext) {
      const firstBit = reader.read(1);
      hasNext = !!+(firstBit);
      rawValue += firstBit;
      const result = reader.read(7);
      value += result;
      rawValue += result;
      if (i-- < 1) {
        debugger;
      }
    }


    const converter = this.config.converter || this.converter;
    return {value: converter(rawValue), rawValue};
  }

  readOrdered(reader: BinaryReader, data: BinaryReaderResult = {}, start = 0): BinaryReaderResult {
    return {...this.read(reader, data), type: this.type};
  }
}
