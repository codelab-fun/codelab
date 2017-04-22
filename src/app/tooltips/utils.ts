export function findPosition(code: string, match: string) {
  const textBeforeMatch = code.slice(0, code.indexOf(match));
  const lineStart = textBeforeMatch.split('\n').length;
  const lineStartPosition = textBeforeMatch.lastIndexOf('\n') + /*compensate for \n */1;
  const indexStart = textBeforeMatch.length - lineStartPosition + 1;

  const lastMatchNewLinePosition = match.lastIndexOf('\n') + 1;
  const lineEnd = lineStart + match.split('\n').length - 1;
  const indexEnd = match.includes('\n') ? match.length - lastMatchNewLinePosition : indexStart + match.length;
  return {lineStart, indexStart, indexEnd, lineEnd};
}
