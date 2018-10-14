

import { StringParser } from './string-parser';
import { BinaryArrayParser } from './array-parser';
import { StringBinaryReader } from '../readers/string-reader';

describe('array parser', () => {
  beforeEach(() => {
    const s = 'Universal Serial Bus'
      .split('')
      .map(a => a.charCodeAt(0))
      .map(a => a.toString(2))
      .map(a => (a as any).padStart(8, 0)).join('');
    this.reader = new StringBinaryReader(s);

  });

  it('can read one letter', () => {
    const parser = new BinaryArrayParser({length: 2, parser: new StringParser({length: 2})});
    expect(parser.read(this.reader).value).toEqual(['Un', 'iv']);
  });

  it('can read one letter', () => {
    const parser = new BinaryArrayParser({
      parser: new StringParser({length: 2})
    });
    expect(parser.read(this.reader).value).toEqual(['Un', 'iv', 'er', 'sa', 'l ', 'Se', 'ri', 'al', ' B', 'us']);
  });

});
