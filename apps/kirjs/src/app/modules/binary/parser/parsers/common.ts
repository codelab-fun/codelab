export interface ParserConfig {
  description?: string;
}

export enum Endianness {
  BIG = 1,
  LITTLE
}

export interface BinaryParserConfig {
  endianness: Endianness.BIG;
}

export const defaultConfig: BinaryParserConfig = {
  endianness: Endianness.BIG
};

export function beToLe32(val) {
  return (
    ((val & 0xff) << 24) |
    ((val & 0xff00) << 8) |
    ((val >> 8) & 0xff00) |
    ((val >> 24) & 0xff)
  );
}

export interface ReadResult {
  parent: ReadResult | null;
  results: ReadResult[];
}
