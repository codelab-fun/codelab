import { AbstractBinaryParser } from './abstract-parser';
import { BinaryReader, BinaryReaderResult } from '../readers/abstract-reader';

export class BinaryObjectParser extends AbstractBinaryParser {
  type = 'object';

  steps: {
    name: string;
    description?: string;
    parser: AbstractBinaryParser;
  }[] = [];

  addStep(name: string, parser: AbstractBinaryParser) {
    this.steps.push({ name, parser });
  }

  read(
    reader: BinaryReader,
    data: BinaryReaderResult = {}
  ): BinaryReaderResult {
    let raw = '';
    const val = this.steps.reduce((result, step) => {
      const { value, rawValue } = step.parser.read(reader, result);
      result[step.name] = value;
      raw += rawValue;
      return result;
    }, {});

    return { value: val, rawValue: raw };
  }

  readOrdered(
    reader: BinaryReader,
    data: BinaryReaderResult = [],
    start = 0
  ): BinaryReaderResult {
    let raw = '';
    let len = 0;

    const value = this.steps.reduce((result, step) => {
      const {
        value,
        rawValue,
        type,
        description,
        displayValue
      } = step.parser.readOrdered(
        reader,
        [...result, { name: '_parent', value: data }],
        start + len
      );
      raw += rawValue;
      if (!type) {
        // tslint:disable-next-line:no-debugger
        debugger;
      }

      len += rawValue.length;
      result.push({
        start: start + len - rawValue.length,
        end: start + len,
        length: rawValue.length,
        name: step.name,
        description,
        value,
        displayValue,
        rawValue,
        type
      });

      return result;
    }, []);

    return {
      start,
      length: len,
      end: start + len,
      value,
      rawValue: raw,
      type: 'object'
    };
  }
}
