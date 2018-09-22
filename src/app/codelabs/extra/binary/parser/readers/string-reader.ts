import { BinaryReader, BinaryReaderResult } from './abstract-reader';

export class StringBinaryReader implements BinaryReader {
  private index = 0;

  constructor(private s: string) {
  }

  hasMore() {
    return this.index < this.s.length;
  }

  peak(bits: number): BinaryReaderResult {
    return this.s.slice(this.index, this.index + bits);
  }

  read(bits: number): BinaryReaderResult {
    this.index += bits;
    const result = this.s.slice(this.index - bits, this.index);
    return result;
  }
}
