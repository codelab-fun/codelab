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


export function wasmAddContent(func, code) {
  return code.replace('{content}', func);
}
