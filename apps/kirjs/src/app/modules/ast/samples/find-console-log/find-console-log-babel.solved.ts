// tslint:ignore
function findConsoleLogSolved(code, { babylon, babelTraverse, log }) {
  return babylon
    .parse(code)
    .program.body.some(node => node.type === 'ConsoleLogStatement');
}
