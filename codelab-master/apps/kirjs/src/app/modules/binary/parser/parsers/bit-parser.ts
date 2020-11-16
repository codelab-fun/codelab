import { AbstractBinaryParser } from './abstract-parser';
import { BinaryReader, BinaryReaderResult } from '../readers/abstract-reader';
import {
  resolveByKey,
  resolveFunctionKeyOrValue,
  resolveOrderedByKey
} from '../utils';

export class BitParser extends AbstractBinaryParser {
  type = 'bits';

  constructor(private config) {
    super();
    this.type = config.type || this.type;
  }

  readWithLength(
    reader: BinaryReader,
    data: BinaryReaderResult = [],
    len: number
  ) {
    const rawValue = reader.read(len);
    const converter = this.config.converter || (a => a);
    return { value: converter(rawValue), rawValue };
  }

  read(
    reader: BinaryReader,
    data: BinaryReaderResult = {}
  ): BinaryReaderResult {
    const len = resolveFunctionKeyOrValue(
      this.config.length,
      data,
      resolveByKey
    );
    return this.readWithLength(reader, data, len);
  }

  readOrdered(
    reader: BinaryReader,
    data: BinaryReaderResult = [],
    start = 0
  ): BinaryReaderResult {
    if (start === 0) {
      // tslint:disable-next-line:no-debugger
      debugger;
    }

    const len = resolveFunctionKeyOrValue(
      this.config.length,
      data,
      resolveOrderedByKey
    );
    const result = this.readWithLength(reader, data, len);
    const length = result.rawValue.length;
    const end = start + length;

    return {
      displayValue:
        (this.config && this.config.enum && this.config.enum[result.value]) ||
        result.value,
      start,
      length,
      end,
      ...result,
      type: this.type,
      description: this.config && this.config.description,
      unconverter: this.config.unconverter
    };
  }
}
