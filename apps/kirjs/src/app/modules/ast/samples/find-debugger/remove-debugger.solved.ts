function removeDebuggerSolved(
  code,
  { babylon, babelTraverse, babelGenerator, log }
) {
  const ast = babylon.parse(code);

  babelTraverse(ast, {
    DebuggerStatement: node => {
      node.remove();
    }
  });

  return babelGenerator(ast).code;
}
