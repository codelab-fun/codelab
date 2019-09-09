async function run(code, {x, y, rowSize}) {
  const result = await WebAssembly.instantiate(code, {config: {rowSize}});
  const r = result.instance.exports.getIndex(x, y);
  return r;
}
