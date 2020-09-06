import { angularSampleCode } from '../angular-sample';

// @ts-ignore
// If you delete this you get a run time error.
// This is needed for gray-matter
window.Buffer = {
  from() {}
};

// @ts-ignore
const matter = require('gray-matter');

/**
 *
 * Takes markdown and returns content.
 * e.g. input:
 *
 * # LOL
 * 1
 * # HI
 * 2
 *
 * result:
 *
 * {LOL: "1", HI: "2"}
 */
function extractHeaders(str) {
  const match = ('\n' + str + '\n#').match(/\n#+.*\n[\s\S]*?(?=\n#)/g);
  return !match
    ? { content: str }
    : match.reduce((result, a) => {
        const [, header, content] = a.match(/^\n#+(.*)\n([\s\S]*)$/);
        result[header.trim().toLocaleLowerCase()] = content.trim();
        return result;
      }, {});
}

/**
 *
 * Takes markdown and returns content.
 * e.g. input:
 *
 * ---
 * title: Hello
 * tags:
 * - tips
 * - good-to-know
 * ---
 *
 * # LOL
 * 1
 * # HI
 * 2
 *
 * result:
 *
 * {title: "Hello", tags: ["tips", "good-to-know"], LOL: "1", HI: "2"}
 *
 */
function mdTextToJson(snippet: string) {
  const metaData = matter(snippet);
  return { ...extractHeaders(metaData.content), ...metaData.data };
}

/**
 * Drop markdown "```language```" from the code
 */
function stripMarkdownLanguageMark(code = '') {
  return code.replace(/```\w+\n/, '').replace(/\n```/, '');
}

function normalize(text) {
  return text ? text.replace(/↵/g, '\n') : '';
}

export function parseSnippet(snippetBody: string) {
  const snippet = mdTextToJson(snippetBody);
  snippet.content = normalize(snippet.content);
  snippet.bonus = normalize(snippet.bonus);

  const demoFiles = Object.entries(snippet)
    .filter(([key]) => key.startsWith('file:'))
    .reduce((files, [key, value]) => {
      files[key.replace(/^file:/, '').trim()] = stripMarkdownLanguageMark(
        value.toString()
      );
      return files;
    }, {});

  if (Object.keys(demoFiles).length) {
    snippet.demo = {
      ...angularSampleCode,
      ...demoFiles
    };
  }

  return snippet;
}
