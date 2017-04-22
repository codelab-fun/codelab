export function findPosition(code: string, match: string) {
  let textBeforeMatch = code.slice(0, code.indexOf(match));

  let lineNumber = textBeforeMatch.split('\n').length;
  let lineStart = textBeforeMatch.lastIndexOf('\n');
  let indexStart = textBeforeMatch.length - lineStart === -1 ? 0 : lineStart;

  let indexEnd = indexStart + match.length;
  return {lineNumber, indexStart, indexEnd};
}
