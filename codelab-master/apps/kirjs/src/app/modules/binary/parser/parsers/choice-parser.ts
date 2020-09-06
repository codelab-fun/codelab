import { AbstractBinaryParser } from './abstract-parser';
import { BinaryReader, BinaryReaderResult } from '../readers/abstract-reader';
import { resolveByKey, resolveOrderedByKey } from '../utils';

export class BinaryChoiceParser extends AbstractBinaryParser {
  constructor(private config) {
    super();
  }

  get type() {
    return 'bich';
  }

  read(
    reader: BinaryReader,
    data: BinaryReaderResult = []
  ): BinaryReaderResult {
    return this.getParser(data, resolveByKey).read(reader, data);
  }

  getParser(data, resolver) {
    let parser: AbstractBinaryParser;

    if (this.config.key) {
      const keyValue = resolver(this.config.key, data);
      parser = this.config.values[keyValue];
    }

    if (this.config.parser) {
      parser = this.config.parser(data);
    }

    if (!parser) {
      // tslint:disable-next-line:no-debugger
      debugger;
    }

    return parser;
  }

  readOrdered(
    reader: BinaryReader,
    data: BinaryReaderResult = [],
    start = 0
  ): BinaryReaderResult {
    const parser = this.getParser(data, resolveOrderedByKey);
    const { value, rawValue, description } = parser.readOrdered(
      reader,
      data,
      start
    );
    return { start, value, rawValue, type: parser.type, description };
  }
}
