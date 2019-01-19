function traverseDebuggerSolved(code, { babylon, babelTraverse, log }) {
  const ast = babylon.parse(code);

  let hasCode = false;
  babelTraverse(ast, {
    DebuggerStatement: () => {
      hasCode = true;
    }
  });
  return hasCode;
}
