import { AbstractBinaryParser } from './abstract-parser';
import { BinaryReader, BinaryReaderResult } from '../readers/abstract-reader';

export class BinaryChoiceParser extends AbstractBinaryParser {
  constructor(private config) {
    super();
  }

  get type() {
    return 'bich';
  };

  read(reader: BinaryReader, data: BinaryReaderResult = {}): BinaryReaderResult {
    return this.getParser(data).read(reader, data);
  }

  getParser(data) {
    let parser: AbstractBinaryParser;

    if (this.config.key) {
      const key = this.config.key(data);
      parser = this.config.values[key];
    }

    if (this.config.parser) {
      parser = this.config.parser(data);
    }

    if (!parser) {
      debugger;
    }

    return parser;
  }

  readOrdered(reader: BinaryReader, data: BinaryReaderResult = [], start = 0): BinaryReaderResult {
    const parser = this.getParser(data);
    const {value, rawValue} = parser.readOrdered(reader, data, start);
    return {start,  value, rawValue, type: parser.type};
  }
}
