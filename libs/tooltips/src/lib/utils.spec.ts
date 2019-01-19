import { findPosition } from './utils';
describe('Utils', () => {
  describe('findPosition', () => {
    it('Whole string is matched', () => {
      expect(findPosition('Hello', 'Hello')).toEqual({
        lineStart: 1,
        indexStart: 1,
        indexEnd: 6,
        lineEnd: 1
      });
    });

    it('Part of the string matched', () => {
      expect(findPosition('YoHello', 'Hello')).toEqual({
        lineStart: 1,
        indexStart: 3,
        indexEnd: 8,
        lineEnd: 1
      });
    });

    it('Multiline beginning of the line', () => {
      expect(
        findPosition(
          `Yo uuuu
Hello`,
          'Hello'
        )
      ).toEqual({ lineStart: 2, indexStart: 1, indexEnd: 6, lineEnd: 2 });
    });
    it('Multiline:2 lines', () => {
      expect(
        findPosition(
          `Yo uuuu

Hello`,
          'Hello'
        )
      ).toEqual({ lineStart: 3, indexStart: 1, indexEnd: 6, lineEnd: 3 });
    });
    it('Multiline with text in beginning', () => {
      expect(
        findPosition(
          `Yo uuuu
123Hello`,
          'Hello'
        )
      ).toEqual({ lineStart: 2, indexStart: 4, indexEnd: 9, lineEnd: 2 });
    });

    it('Multiline with multiline match', () => {
      expect(
        findPosition(
          `Yo uuuu
He\nllo`,
          'He\nllo'
        )
      ).toEqual({ lineStart: 2, indexStart: 1, indexEnd: 3, lineEnd: 3 });
    });

    it('Assymetric line break in match', () => {
      expect(
        findPosition(
          `Yo uuuu
He\nlloooo`,
          'He\nlloooo'
        )
      ).toEqual({ lineStart: 2, indexStart: 1, indexEnd: 6, lineEnd: 3 });
    });

    it('Multiline with spaces before match', () => {
      expect(
        findPosition(
          `Yo uuuu
   He\nlloooo`,
          'He\nlloooo'
        )
      ).toEqual({ lineStart: 2, indexStart: 4, indexEnd: 6, lineEnd: 3 });
    });

    it('Regex multiline with spaces before match', () => {
      expect(findPosition(`aaaaaabbbbbbaaaaaaaa`, /b+/)).toEqual({
        lineStart: 1,
        indexStart: 7,
        indexEnd: 13,
        lineEnd: 1
      });
    });
  });
});
