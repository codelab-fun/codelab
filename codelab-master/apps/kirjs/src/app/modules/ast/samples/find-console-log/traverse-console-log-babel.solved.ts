function traverseConsoleLogSolved(
  code,
  { babylon, babelTraverse, types, log }
) {
  const ast = babylon.parse(code);
  let hasConsoleLog = false;
  babelTraverse(ast, {
    MemberExpression(path) {
      if (
        path.node.property.type === 'Identifier' &&
        path.node.property.name === 'log' &&
        path.node.object.type === 'Identifier' &&
        path.node.object.name === 'console' &&
        path.parent.type === 'CallExpression' &&
        path.key === 'callee'
      ) {
        hasConsoleLog = true;
      }
    }
  });

  return hasConsoleLog;
}
