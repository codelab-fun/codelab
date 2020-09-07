import { AbstractBinaryParser } from './abstract-parser';
import { BinaryReader, BinaryReaderResult } from '../readers/abstract-reader';
import { BaseConfig } from '../binary-parser';

export interface VarUintParserConfig extends BaseConfig {
  size?: number;
}

export const defaultVarUintParserConfig = {
  size: 7
};

export class VarUintParser extends AbstractBinaryParser {
  type = 'bits';

  constructor(
    private config: VarUintParserConfig = defaultVarUintParserConfig
  ) {
    super();
    this.type = config.type || this.type;
  }

  static converter(n: string) {
    return parseInt(n, 2);
  }

  read(
    reader: BinaryReader,
    data: BinaryReaderResult = {}
  ): BinaryReaderResult {
    let hasNext = true;
    let value = '';
    let rawValue = '';
    const size = this.config.size || 7;

    let i = 100;
    while (hasNext) {
      const firstBit = reader.read(1);
      hasNext = !!+firstBit;
      rawValue += firstBit;
      const result = reader.read(size);
      value += result;
      rawValue += result;
      if (i-- < 1) {
        // tslint:disable-next-line:no-debugger
        debugger;
      }
    }

    const converter = this.config.converter || VarUintParser.converter;
    return { value: converter(rawValue), rawValue };
  }

  readOrdered(
    reader: BinaryReader,
    data: BinaryReaderResult = [],
    start = 0
  ): BinaryReaderResult {
    return { ...this.read(reader, data), type: this.type };
  }
}
