export type BinaryReaderResult = any;

export abstract class BinaryReader {
  abstract read(bits: number);
  abstract peak(bits: number);

  abstract hasMore(): boolean
}
