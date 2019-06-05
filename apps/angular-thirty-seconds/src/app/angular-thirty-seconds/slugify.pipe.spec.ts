import { SlugifyPipe } from './slugify.pipe';

describe('SlugifyPipe', () => {
  it('create an instance', () => {
    const pipe = new SlugifyPipe();
    expect(pipe).toBeTruthy();
  });
});
