import { StringBinaryReader } from '../readers/string-reader';
import { FirstBitParser } from './first-bit-parser';

fdescribe('FirstBitParse', () => {
  it('can read 1 byte', () => {
    const reader = new StringBinaryReader('0111111111111111');
    const result = new FirstBitParser().read(reader);
    expect(result.rawValue).toEqual('01111111');
  });
  it('can read 1 byte', () => {
    const reader = new StringBinaryReader('11111111');
    const result = new FirstBitParser().read(reader);
    expect(result.rawValue).toEqual('11111111');
  });

  it('can read 2 bytes', () => {
    const reader = new StringBinaryReader('1111111101111111111');
    const result = new FirstBitParser().read(reader);
    expect(result.rawValue).toEqual('1111111101111111');
  });

  it('can read 3 bytes', () => {
    const reader = new StringBinaryReader('111111111111111101111111111');
    const result = new FirstBitParser().read(reader);
    expect(result.rawValue).toEqual('111111111111111101111111');
  });


});
