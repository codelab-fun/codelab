import { parse } from 'babylon';
import generate from '@babel/generator';
import babel_traverse from '@babel/traverse';

export function isLoc(node) {
  return (
    node.key.value === 'loc' ||
    node.key.value === 'start' ||
    node.key.value === 'end' ||
    node.key.value === 'extra'
  );
}

export function isType(node) {
  return node.key.value === 'type';
}

export function isBody(node) {
  return node.key.value === 'body';
}

export function removeLoc(path) {
  if (isLoc(path.node)) {
    path.remove();
  }
}

export function removeExtra(path) {
  if (isLoc(path.node)) {
    path.remove();
  }
}

export function locToMonacoLoc(loc, className) {
  return {
    loc: [
      loc.start.line,
      loc.start.column + 1,
      loc.end.line,
      loc.end.column + 1
    ],
    className
  };
}
export function parseCode(code) {
  return parse(code);
}

export function processCode(code, { remove = [] }: any) {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['decorators']
  });

  babel_traverse(ast, {
    ObjectProperty(path) {
      remove.forEach(callback => callback(path));
    }
  });

  return generate(ast, {}).code;
}

export function findHighlightsObjectProp(code: string, matchers: Array<any>) {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['decorators']
  });

  const highlights = [];

  babel_traverse(ast, {
    ObjectProperty({ node }) {
      if (matchers.some(matcher => matcher(node))) {
        highlights.push(locToMonacoLoc(node.loc, 'loc'));
      }
    }
  });
  return highlights;
}

export function findHighlightsAll(code: string, matcher) {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['decorators']
  });

  const highlights = [];

  babel_traverse(ast, {
    enter({ node }) {
      const className = matcher(node);
      if (className) {
        highlights.push(locToMonacoLoc(node.loc, className));
      }
    }
  });
  return highlights;
}

export function removeDoubleWhiteLines(code) {
  return code.replace(/\n\n/gi, '\n');
}
