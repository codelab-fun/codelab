import { BinaryReader, BinaryReaderResult } from '../readers/abstract-reader';

export abstract class AbstractBinaryParser {
  type: string;

  abstract read(reader: BinaryReader, data: BinaryReaderResult): BinaryReaderResult

  abstract readOrdered(reader: BinaryReader, data: BinaryReaderResult, start: number): BinaryReaderResult
}
