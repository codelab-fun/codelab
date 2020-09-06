function findFit(code, { babylon, babelTraverse, babelGenerator, log }) {
  const ast = babylon.parse(code);

  babelTraverse(ast);

  return babelGenerator(ast).code;
}
