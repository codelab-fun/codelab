import { BinaryParser } from '../binary-parser';
import { StringParser } from './string-parser';
import { StringBinaryReader } from '../readers/string-reader';

describe('BinaryParser', () => {
  beforeEach(() => {
    const s = 'Universal Serial Bus'
      .split('')
      .map(a => a.charCodeAt(0))
      .map(a => a.toString(2))
      .map(a => (a as any).padStart(8, 0)).join('');
    this.reader = new StringBinaryReader(s);

  });


  fdescribe('string parser', () => {
    it('can read one letter', () => {
      const parser = new StringParser({length: 1});
      expect(parser.read(this.reader).value).toBe('U');
    });

    it('can read 3 letttes', () => {
      const parser = new StringParser({length: 3});
      expect(parser.read(this.reader).value).toBe('Uni');
    });


    describe('readuntil', () => {
      const s = 'lollol'
        .split('')
        .map(a => a.charCodeAt(0))
        .map(a => a.toString(2))
        .map(a => (a as any).padStart(8, 0)).join('');

      const s2 = 'ogogog'
        .split('')
        .map(a => a.charCodeAt(0))
        .map(a => a.toString(2))
        .map(a => (a as any).padStart(8, 0)).join('');


      it('can read until 00', () => {
        this.reader = new StringBinaryReader(s + '00000000' + s2);
        const parser = new StringParser({readUntil: '00000000'});
        const binaryReaderResult = parser.readOrdered(this.reader);
        expect(binaryReaderResult.value).toBe('lollol');
      });

      it('Reads the whole thing if no 00', () => {
        this.reader = new StringBinaryReader(s + '01010101' + s2);
        const parser = new StringParser({readUntil: '00000000'});
        const binaryReaderResult = parser.readOrdered(this.reader);
        expect(binaryReaderResult.value).toBe('lollolUogogog');
      });

    });


    it('can read ordered 3 letttes', () => {
      const parser = new StringParser({length: 3});
      const binaryReaderResult = parser.readOrdered(this.reader);
      expect(binaryReaderResult.value).toBe('Uni');
      expect(binaryReaderResult.start).toBe(0);
      expect(binaryReaderResult.end).toBe(24);
      expect(binaryReaderResult.length).toBe(24);
    });
  });
});
