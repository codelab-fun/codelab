export function extractFunction(name, code) {
  return extractExpressionByMatch(new RegExp('\\\(func \\\$' + name), code);
}

export function extractTableCode(code) {
  const elements = extractExpressionByMatch(/\(elem/, code);
  const functions = [...new Set([...elements.matchAll(/\$(\w+)\b/g)].map(a => a[1]))].map(name => extractFunction(name, code)).join('\n');


  const tableDef = extractExpressionByMatch(/\(table/, code);
  return `
  ;; table
  ${tableDef}

  ;; elem
  ${elements}

  ;; table functions
  ${functions}
`;
}

export function extractTypeCode(code) {
  // TODO(kirjs): This would only extract one type, at some point there can be more
  const type = extractExpressionByMatch(/\(type/, code);

  return `
  ;; types (we only extract one ATM)
  ${type}
`;
}


export function extractExpressionByMatch(regex, code) {
  const match = regex.exec(code);
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
  const match = /(?:get_global|global\.get)\s+\$(\w+)*/g;
  return [...new Set([...code.matchAll(match)].map(a => a[1]))];
}

export function hasMemoryCalls(code) {
  return /i32\.(store|load)\s+/g.test(code);
}

export function hasTypeCalls(code) {
  return /type \$/g.test(code);
}

export function hasTableCalls(code) {
  return /(call_indirect)\s+/g.test(code);
}


export function extractFunctionWithDependencies(name, code: string, dependencies: string[]) {
  return extractFunctionDependencyNames(name, code, dependencies).map(name => extractFunction(name, code)).join('\n');
}

export function extractFunctionDependencyNames(name, code: string, dependencies: string[]) {
  const funcCode = extractFunction(name, code);
  const match = /(?:\bcall)\s+\$(\w+)*/g;
  const functions = [...new Set([...funcCode.matchAll(match)].map(a => a[1]))].filter(d => !dependencies.includes(d));
  const nestedDeps = functions
    .flatMap(f => extractFunctionDependencyNames(f, code, [...dependencies, ...functions]));
  return [...new Set([...dependencies, ...nestedDeps])];
}

function getMemoryCode(hasMemory: boolean) {
  return hasMemory ? `
  (memory 1)
  (export "memory" (memory 0))
  ` : '';
}

export function generateWatTestCode({code, globals, name, hasMemory, table, types}: any) {
  const globalsCode = globals.map(global => `  (import "config" "${global}" (global $${global} i32))`).join('\n');
  const memoryCode = getMemoryCode(hasMemory);

  return `(module
  (export "${name}" (func $${name}))
  ${types}
  ${globalsCode}
  ${table}
  ${memoryCode}
  ${code}
)`;


}
