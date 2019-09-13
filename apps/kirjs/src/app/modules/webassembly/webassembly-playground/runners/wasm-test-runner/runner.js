async function run(code, {args, imports, name, memory}) {
  const result = await WebAssembly.instantiate(code, imports);
  if (memory) {
    const mem = new Uint32Array(result.instance.exports.memory.buffer);
    for (let m = 0; m < memory.length; m++) {
      mem[m] = memory[m];
    }
  }
  return result.instance.exports[name](...args);
}
