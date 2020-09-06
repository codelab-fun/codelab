function addItByLine(
  code,
  line,
  { babylon, babelTraverse, babelGenerator, log }
) {
  const ast = babylon.parse(code);

  babelTraverse(ast, {
    Identifier: ({ node, parentPath }) => {
      if (node.name === 'it' && parentPath.isCallExpression()) {
        if (node.loc.start.line === line) {
          node.name = 'fit';
        }
      }
    }
  });

  return babelGenerator(ast).code;
}
