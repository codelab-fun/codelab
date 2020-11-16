import { Snippet } from '../interfaces/snippet';
import { angularSampleCode } from '../angular-sample';
import { SEPARATOR } from '../consts';

const config = {
  header: ['title', 'author', 'twitter', 'level', 'links', 'tags'],
  body: ['content', 'bonus']
};

function arrayToMarkdownList(tagsArray: Array<string>): string {
  return tagsArray
    .filter(a => a)
    .map(x => `- ${x}`)
    .join(`\n`);
}

function generateMdHeader(keys: string[], snippet: Snippet) {
  return keys
    .map(key => ({
      key,
      value: snippet[key]
    }))
    .filter(({ value }) => !!value)
    .map(({ value, key }) => {
      if (typeof value === 'string') {
        return `${key}: ${value}`;
      }
      if (Array.isArray(value)) {
        return `${key}:
${arrayToMarkdownList(value)}`;
      }
      throw new Error(key + 'is not a real key');
    })
    .join(SEPARATOR);
}

const ucFirst = s => {
  if (typeof s !== 'string') {
    return '';
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const extensionTolanguage = {
  ts: 'typescript',
  js: 'javascript'
};

function getFileLanguage(fileName) {
  const fileExtension =
    fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) ||
    fileName;
  return extensionTolanguage[fileExtension] || fileExtension;
}

/**
 * Drop markdown "```language```" from the code
 */
function addMarkdownLanguageMark(code: string, filename: string) {
  return `\`\`\`${getFileLanguage(filename)}
${code}
\`\`\``;
}

function generateMdBody(keys: string[], snippet: Snippet) {
  return keys
    .map(key => ({
      key,
      value: snippet[key]
    }))
    .filter(({ value, key }) => !!value)
    .map(({ value, key }) => {
      return `# ${ucFirst(key)}
${value}
`;
    })
    .join(SEPARATOR);
}

function generateDemo(snippet) {
  if (!snippet.demo) {
    return '';
  }

  return (
    Object.entries(snippet.demo)
      .filter(([key, value]) => value && value !== angularSampleCode[key])
      .map(([key, value]) => {
        return `# file:${key}
${addMarkdownLanguageMark(value.toString(), key)}`;
      })
      .join(SEPARATOR) + SEPARATOR
  );
}

export function generateSnippet(snippet: Snippet) {
  const header = generateMdHeader(config.header, snippet);
  const body = generateMdBody(config.body, snippet);
  const demo = generateDemo(snippet);
  return `---
${header}
---
${body}
${demo}`;
}
