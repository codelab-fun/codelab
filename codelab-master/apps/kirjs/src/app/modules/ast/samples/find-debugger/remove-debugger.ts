function removeDebugger(code, { babylon, babelTraverse, babelGenerator, log }) {
  const ast = babylon.parse(code);

  let hasDebugger = false;
  babelTraverse(ast, {
    DebuggerStatement: node => {
      hasDebugger = true;
    }
  });

  return hasDebugger;
}
