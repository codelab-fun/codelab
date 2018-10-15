
import { StringBinaryReader } from '../readers/string-reader';
import { BitParser } from './bit-parser';
import { BinaryChoiceParser } from './choice-parser';
import { StringParser } from './string-parser';

describe('BinaryParser', () => {
  beforeEach(() => {
    const s = 'Universal Serial Bus'
      .split('')
      .map(a => a.charCodeAt(0))
      .map(a => a.toString(2))
      .map(a => (a as any).padStart(8, 0)).join('');
    this.reader = new StringBinaryReader(s);

  });


  describe('choice parser', () => {
    it('can read one letter', () => {
      const parser = new BinaryChoiceParser({
        key: ({p}) => p,
        values: {
          '1': new BitParser({length: 8}),
          '2': new StringParser({length: 2}),
        }
      });
      expect(parser.read(this.reader, {p: '1'}).value).toEqual('01010101');
      expect(parser.read(this.reader, {p: '2'}).value).toEqual('ni');
    });

    it('can read one letter', () => {
      const parser = new BinaryChoiceParser({
        key: ({p}) => p,
        values: {
          '1': new BitParser({length: 8}),
          '2': new StringParser({length: 2}),
        }
      });
      expect(parser.readOrdered(this.reader, {p: '1'}).value).toEqual('01010101');
      expect(parser.readOrdered(this.reader, {p: '2'}).value).toEqual('ni');
    });
  });

});
