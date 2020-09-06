// tslint:ignore
function findDebuggerSolved(code, { babylon, babelTraverse, log }) {
  return babylon
    .parse(code)
    .program.body.some(node => node.type === 'DebuggerStatement');
}
