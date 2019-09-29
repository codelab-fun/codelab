import { getTypeScript } from '@codelab/utils/src/lib/loaders/loaders';

const ts = getTypeScript();

namespace ts {
  export type Node = any;
}

// TODO(kirjs): Consider adding a test.
export function simpleVisitor(
  code: ts.Node,
  filter: (f: ts.Node) => any,
  callback: (f: ts.Node) => any
) {
  function visit(node) {
    if (filter(node)) {
      callback(node);
    }
    ts.forEachChild(node, visit);
  }

  visit(code);
}
