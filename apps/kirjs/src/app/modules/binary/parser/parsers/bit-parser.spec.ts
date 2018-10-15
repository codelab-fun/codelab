import { StringBinaryReader } from '../readers/string-reader';
import { BitParser } from './bit-parser';

describe('BinaryParser', () => {
  beforeEach(() => {
    const s = 'Universal Serial Bus'
      .split('')
      .map(a => a.charCodeAt(0))
      .map(a => a.toString(2))
      .map(a => (a as any).padStart(8, 0)).join('');
    this.reader = new StringBinaryReader(s);

  });

  describe('bit parser', () => {
    it('can read 3 bit bit', () => {
      const parser = new BitParser({length: 3});
      const results = parser.read(this.reader);
      expect(results.value).toBe('010');
      expect(results.rawValue).toBe('010');
    });

    it('takes a length function', () => {
      const parser = new BitParser({length: () => 3});

      const result = parser.read(this.reader);
      expect(result.value).toBe('010');
      expect(result.rawValue).toBe('010');
    });

    it('takes a length function which can use existing data', () => {
      const parser = new BitParser({length: (data) => data.len});
      const result = parser.read(this.reader, {len: 3});
      expect(result.value).toBe('010');
      expect(result.rawValue).toBe('010');
    });
  });

});
