function traverseConsoleLogSolved2(code, {babylon, babelTraverse, types, log}) {
  const ast = babylon.parse(code);
  let hasCode = false;
  babelTraverse(ast, {
    MemberExpression: ({node, parentPath, parentKey}) => {
      if (
        parentPath.isCallExpression()
        && node.object.type === 'Identifier'
        && node.object.name === 'console'
        && node.property.type === 'Identifier'
        && node.property.name === 'log'
        && parentKey === 'callee'
      ) {
        hasCode = true;
      }
    }
  });
  return hasCode;
}
