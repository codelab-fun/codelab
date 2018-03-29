function removeConsoleLogSolved(code, {babylon, babelTraverse, types, babelGenerator, log}) {
  const ast = babylon.parse(code);

  babelTraverse(ast, {
    CallExpression: (path) => {
      const node = path.node;
      if (
        types.isMemberExpression(node.callee)
        && types.isIdentifier(node.callee.object, {name: 'console'})
        && types.isIdentifier(node.callee.property, {name: 'log'})
      ) {
        path.remove();
      }
    }
  });

  return babelGenerator(ast).code;
}
