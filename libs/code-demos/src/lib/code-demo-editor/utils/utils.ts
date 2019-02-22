export function findPosition(code: string, match: string | RegExp) {
  if (match instanceof RegExp) {
    try {
      match = code.match(match)[0];
    } catch (e) {
      // tslint:disable-next-line:no-debugger
      debugger;
      match = '';
    }
  }

  const textBeforeMatch = code.split(match as any)[0];
  const lineStart = textBeforeMatch.split('\n').length;
  const lineStartPosition =
    textBeforeMatch.lastIndexOf('\n') + /*compensate for \n */ 1;
  const indexStart = textBeforeMatch.length - lineStartPosition + 1;
  const lastMatchNewLinePosition = match.lastIndexOf('\n') + 1;
  const lineEnd = lineStart + match.split('\n').length - 1;
  const indexEnd = match.includes('\n')
    ? match.length - lastMatchNewLinePosition
    : indexStart + match.length;
  return { lineStart, indexStart, indexEnd, lineEnd };
}
