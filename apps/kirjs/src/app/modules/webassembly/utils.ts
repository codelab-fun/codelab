export function extractFunction(name, code) {
  const match = new RegExp('\\\(func \\\$' + name).exec(code);
  if (match) {
    let i = match.index;
    let braces = 0;
    while (true) {
      const c = code[i];

      if (!c) {
        return null;
      }


      if (c === '(') {
        braces++;
      }
      if (c === ')') {
        braces--;
      }

      i++;

      if (braces === 0) {
        return code.substring(match.index, i);
      }
    }
  }
}


export function extractGlobals(code) {
  const match = /(?:get_global|global\.get)\s+\$(\w+)*/;
  return [...new Set([...code.matchAll(match)].map(a => a[1]))];
}

export function wasmAddContent(func, code) {
  return code.replace('{content}', func);
}


export function generateWatTestCode({code, globals, name}: any) {
  const globalsCode = globals.map(global => `(import "config" "${global}" (global $${global} i32))`).join('\n');
  return `(module
  (export "${name}" (func $${name}))
  ${globalsCode}
  ${code}
)`;


}
