import * as ts from 'typescript';

// TODO(kirjs): Consider adding a test.
export function simpleVisitor(code: ts.Node, filter: (f: ts.Node) => void, callback: (f: ts.Node) => void) {
  function visit(node) {
    if (filter(node)) {
      callback(node);
    }
    ts.forEachChild(node, visit);
  }

  visit(code);
}
