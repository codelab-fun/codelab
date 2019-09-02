function findFit(code, { babylon, babelTraverse, babelGenerator, log }) {
  const ast = babylon.parse(code);

  babelTraverse(ast, {
    Identifier: ({ node, parentPath }) => {
      if (node.name === 'fit' && parentPath.isCallExpression()) {
        node.name = 'it';
      }
    }
  });

  return babelGenerator(ast).code;
}
