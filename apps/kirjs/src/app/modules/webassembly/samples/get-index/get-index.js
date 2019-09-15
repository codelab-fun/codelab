async function run(code, {args, imports, name}) {
  return (await WebAssembly.instantiate(code, imports)).instance.exports[name](...args);
}
