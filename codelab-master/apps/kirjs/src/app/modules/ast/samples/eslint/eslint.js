function findFit(code, { babylon, babelTraverse, babelGenerator, log }) {
  const ast = babylon.parse(code);

  babelTraverse(ast);

  log(babelGenerator(ast).code);
  return babelGenerator(ast).code;
}
