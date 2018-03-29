function removeConsoleLog(code, {babylon, types, babelTraverse, babelGenerator, log}) {
  const ast = babylon.parse(code);
  let hasCode = false;
  babelTraverse(ast, {
    CallExpression: ({node, parentKey, parentPath}) => {
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
