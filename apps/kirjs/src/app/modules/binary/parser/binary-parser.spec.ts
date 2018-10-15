import { StringBinaryReader } from './readers/string-reader';
import { BinaryParser } from './binary-parser';

describe('BinaryParser', () => {
  beforeEach(() => {
    const s = 'Universal Serial Bus'
      .split('')
      .map(a => a.charCodeAt(0))
      .map(a => a.toString(2))
      .map(a => (a as any).padStart(8, 0)).join('');
    this.reader = new StringBinaryReader(s);

  });

  describe('BinaryParser', () => {
    it('allows shortcuts', () => {
      const parser = new BinaryParser()
        .string('u', {length: 3})
        .bit1('a')
        .bit1('b');

      expect(parser.read(this.reader, {}).value).toEqual({a: '0', b: '1', u: 'Uni'});
    });

    it('allows nesting', () => {
      const header = new BinaryParser()
        .bit1('a')
        .bit1('b');

      const parser = new BinaryParser()
        .block('header', header)
        .bit1('c')
        .bit1('d');

      expect(parser.read(this.reader).value).toEqual({header: {a: '0', b: '1'}, c: '0', d: '1'});
    });

    it('tracks position', () => {
      const header = new BinaryParser()
        .bit1('a')
        .bit1('b');

      const parser = new BinaryParser()
        .block('header', header)
        .bit1('c')
        .bit1('d');

      const result = parser.readOrdered(this.reader).value;

      expect(result).toEqual([
        {
          'start': 0,
          'end': 2,
          'length': 2,
          'name': 'header',
          'value': [
            {
              'start': 0,
              'end': 1,
              'length': 1,
              'name': 'a',
              'value': '0',
              'rawValue': '0',
              'type': 'bits'
            },
            {
              'start': 1,
              'end': 2,
              'length': 1,
              'name': 'b',
              'value': '1',
              'rawValue': '1',
              'type': 'bits'
            }
          ],
          'rawValue': '01',
          'type': 'object'
        },
        {
          'start': 2,
          'end': 3,
          'length': 1,
          'name': 'c',
          'value': '0',
          'rawValue': '0',
          'type': 'bits'
        },
        {
          'start': 3,
          'end': 4,
          'length': 1,
          'name': 'd',
          'value': '1',
          'rawValue': '1',
          'type': 'bits'
        }
      ]);
    });

    it('allows uint16', () => {
      const parser = new BinaryParser()
        .uInt16('u');
      expect(parser.read(this.reader).value).toEqual({u: 28245});
    });

  });


});
