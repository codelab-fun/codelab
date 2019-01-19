import { Highlights } from './highlights';

describe('highlights', () => {
  beforeEach(() => {
    this.highlights = new Highlights();
  });

  it('gets empty value if there are no highlightss set', () => {
    expect(this.highlights.get([0, 0])).toBe('');
  });

  it('Toggles single value', () => {
    this.highlights.toggle([1, 2], 'pirojok');
    expect(this.highlights.get([1, 2])).toBe('pirojok');
    expect(this.highlights.get([5, 5])).toBe('');
    this.highlights.toggle([1, 2], 'pirojok');
    expect(this.highlights.get([1, 2])).toBe('');
  });

  it('Toggles multiple values', () => {
    this.highlights.toggle([1, 2], 'a');
    this.highlights.toggle([1, 2], 'b');
    expect(this.highlights.get([1, 2])).toBe('a b');
    this.highlights.toggle([1, 2], 'c');
    expect(this.highlights.get([1, 2])).toBe('a b c');
    this.highlights.toggle([1, 2], 'b');
    expect(this.highlights.get([1, 2])).toBe('a c');
  });

  it('Allows chaning', () => {
    expect(this.highlights.toggle([1, 2], 'a').get([1, 2])).toBe('a');
  });
});
