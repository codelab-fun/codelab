import { BinaryReader, BinaryReaderResult } from '../readers/abstract-reader';

export abstract class DebuggerParser {
  type = 'debugger';

  read(reader: BinaryReader, data: BinaryReaderResult) {
    debugger;
  }

  readOrdered(reader: BinaryReader, data: BinaryReaderResult) {
    debugger;
  }
}
