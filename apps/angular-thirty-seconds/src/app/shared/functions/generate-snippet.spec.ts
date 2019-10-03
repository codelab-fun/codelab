import { testSnippetMd, testSnippetParsed } from './test-data/snippet';
import { generateSnippet } from './generate-snippet';

describe('GenerateSnippet', () => {
  it('generates a simple snippet', () => {
    const actual = generateSnippet(testSnippetParsed);
    expect(actual).toEqual(testSnippetMd);
  });

  it('generates a snippet without demo', () => {
    const testSnippet = { ...testSnippetParsed };
    delete testSnippet.demo;
    const actual = generateSnippet(testSnippet);
    expect(actual).not.toContain('file:');
  });

  it('generates a snippet without bonus', () => {
    const testSnippet = { ...testSnippetParsed };
    delete testSnippet.bonus;
    const actual = generateSnippet(testSnippet);
    expect(actual).not.toContain('bonus');
  });

  it('generates a snippet without links', () => {
    const testSnippet = { ...testSnippetParsed };
    delete testSnippet.links;
    const actual = generateSnippet(testSnippet);
    expect(actual).not.toContain('links');
  });
});
