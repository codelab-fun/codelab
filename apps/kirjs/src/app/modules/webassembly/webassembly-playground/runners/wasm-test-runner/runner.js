async function run(code, { args, imports, name, memory }) {
  // imports.config.log = console.log;

  const program = await WebAssembly.instantiate(code, imports);

  if (memory) {
    if (!program.instance.exports.memory) {
      throw new Error(
        'This test expects memory to be exported from WebAssembly, but none was exported.'
      );
    }
    const mem = new Uint32Array(program.instance.exports.memory.buffer);
    for (let m = 0; m < memory.length; m++) {
      mem[m] = memory[m];
    }
  }

  if (imports) {
    Object.entries(imports.config).map(([key, value]) => {
      if (program.instance.exports[key]) {
        program.instance.exports[key].value = value;
      }
    });
  }

  const result = program.instance.exports[name](...args);
  return {
    result,
    exports: program.instance.exports
  };
}
