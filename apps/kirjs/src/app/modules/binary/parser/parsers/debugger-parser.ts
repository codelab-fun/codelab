import { BinaryReader, BinaryReaderResult } from '../readers/abstract-reader';

export abstract class DebuggerParser {
  type = 'debugger';

  read(reader: BinaryReader, data: BinaryReaderResult) {
    // tslint:disable-next-line:no-debugger
    debugger;
  }

  readOrdered(reader: BinaryReader, data: BinaryReaderResult) {
    // tslint:disable-next-line:no-debugger
    debugger;
  }
}
