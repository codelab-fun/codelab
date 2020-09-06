function traverseConsoleLogSolved2(code, { babylon, babelTraverse, types }) {
  const ast = babylon.parse(code);
  let hasConsoleLog = false;
  babelTraverse(ast, {
    MemberExpression(path) {
      if (
        types.isIdentifier(path.node.object, { name: 'console' }) &&
        types.isIdentifier(path.node.property, { name: 'log' }) &&
        types.isCallExpression(path.parent) &&
        path.parentKey === 'callee'
      ) {
        hasConsoleLog = true;
      }
    }
  });

  return hasConsoleLog;
}
