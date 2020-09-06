function removeConsoleLogSolved(
  code,
  { babelGenerator, babylon, babelTraverse, types }
) {
  const ast = babylon.parse(code);

  babelTraverse(ast, {
    MemberExpression(path) {
      if (
        types.isIdentifier(path.node.object, { name: 'console' }) &&
        types.isIdentifier(path.node.property, { name: 'log' }) &&
        types.isCallExpression(path.parent) &&
        path.parentKey === 'callee'
      ) {
        path.parentPath.remove();
      }
    }
  });

  return babelGenerator(ast).code;
}
