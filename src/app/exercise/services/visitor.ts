import * as ts from 'typescript';

export function simpleVisitor(code, filter, callback) {

  /**
   * Fancy: Require the actual source code, and search in it.
   */
  function visit(node) {
    if (filter(node)) {
      callback(node);
    }
    ts.forEachChild(node, visit);
  }

  visit(code);
}
