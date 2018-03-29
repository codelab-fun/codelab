function traverseConsoleLogSolved(code, {babylon, babelTraverse, log}) {
  const ast = babylon.parse(code);
  let hasCode = false;
  babelTraverse(ast, {
    MemberExpression: ({node, parentPath}) => {
      if (
        parentPath.isCallExpression()
        && node.object.type === 'Identifier'
        && node.object.name === 'console'
        && node.property.type === 'Identifier'
        && node.property.name === 'log'
      ) {
        hasCode = true;
      }
    }
  });
  return hasCode;
}
