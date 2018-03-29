function traverseConsoleLogSolved3(code, {babylon, babelTraverse, types, log}) {
  const ast = babylon.parse(code);
  let hasCode = false;
  babelTraverse(ast, {
    MemberExpression: ({node, parentPath, parentKey}) => {
      if (
        types.isIdentifier(node.object, { name: 'console'})
        && types.isIdentifier(node.property, { name: 'log'})
        && parentKey === 'callee'
        && parentPath.isCallExpression()
      ) {
        hasCode = true;
      }
    }
  });
  return hasCode;
}
