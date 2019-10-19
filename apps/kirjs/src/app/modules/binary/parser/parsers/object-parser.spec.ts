import { StringBinaryReader } from '../readers/string-reader';
import { BinaryObjectParser } from './object-parser';
import { BitParser } from './bit-parser';

describe('BinaryParser', () => {
  beforeEach(() => {
    const s = 'Universal Serial Bus'
      .split('')
      .map(a => a.charCodeAt(0))
      .map(a => a.toString(2))
      .map(a => (a as any).padStart(8, 0))
      .join('');
    this.reader = new StringBinaryReader(s);
  });

  describe('BinaryObjectParser', () => {
    it('can read simple bits', () => {
      const parser = new BinaryObjectParser();
      parser.addStep('a', new BitParser({ length: 1 }));
      parser.addStep('b', new BitParser({ length: 2 }));
      parser.addStep('c', new BitParser({ length: 1 }));

      const result = parser.read(this.reader);
      expect(result.value).toEqual({
        a: '0',
        b: '10',
        c: '1'
      });
    });

    it('can read nested objects', () => {
      const parser = new BinaryObjectParser();
      parser.addStep('a', new BitParser({ length: 1 }));

      const innerParser = new BinaryObjectParser();
      innerParser.addStep('a', new BitParser({ length: 1 }));
      innerParser.addStep('b', new BitParser({ length: 1 }));
      parser.addStep('inner', innerParser);
      parser.addStep('b', new BitParser({ length: 1 }));
      const result = parser.read(this.reader);
      expect(result.value).toEqual({
        a: '0',
        inner: {
          a: '1',
          b: '0'
        },
        b: '1'
      });
    });

    it('can read nested objects', () => {
      const parser = new BinaryObjectParser();
      parser.addStep('a', new BitParser({ length: 1 }));

      const innerParser = new BinaryObjectParser();
      innerParser.addStep('a', new BitParser({ length: 1 }));
      innerParser.addStep('b', new BitParser({ length: 1 }));
      parser.addStep('inner', innerParser);
      parser.addStep('b', new BitParser({ length: 1 }));
      const result = parser.readOrdered(this.reader);

      expect(result.value).toEqual([
        {
          description: undefined,
          displayValue: '0',
          end: 1,
          length: 1,
          name: 'a',
          value: '0',
          rawValue: '0',
          start: 0,
          type: 'bits'
        },
        {
          name: 'inner',
          value: [
            {
              description: undefined,
              displayValue: '1',
              end: 2,
              length: 1,
              name: 'a',
              value: '1',
              start: 1,
              rawValue: '1',
              type: 'bits'
            },
            {
              description: undefined,
              displayValue: '0',
              end: 3,
              length: 1,
              name: 'b',
              value: '0',
              start: 2,
              rawValue: '0',
              type: 'bits'
            }
          ],
          description: undefined,
          displayValue: undefined,
          end: 3,
          length: 2,
          rawValue: '10',
          start: 1,
          type: 'object'
        },
        {
          description: undefined,
          displayValue: '1',
          end: 4,
          length: 1,
          name: 'b',
          value: '1',
          start: 3,
          rawValue: '1',
          type: 'bits'
        }
      ]);
    });
  });
});
