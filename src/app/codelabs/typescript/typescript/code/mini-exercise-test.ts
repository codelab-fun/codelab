import { value } from './app';
import { app_ts_AST, ts } from './code';

declare const it, describe;


function getFunctionNode(code) {
  let functionNode = undefined;

  /**
   * Fancy: Require the actual source code, and search in it.
   */
  function findFunctionNode(node) {
    if (node.kind === ts.SyntaxKind.FunctionDeclaration) {
      functionNode = node;
    }
    ts.forEachChild(node, findFunctionNode);
  }

  findFunctionNode(code);
  return functionNode;
}


describe('value', () => {
  it(`@@specifyTheTypeForB`, () => {
    const func = getFunctionNode(app_ts_AST);
    chai.assert(func.parameters[1].type && func.parameters[1].type.kind === ts.SyntaxKind.NumberKeyword, 'Test failed: b is not a number');
  });

  it('@@typescriptHighlightsErrorFix224', () => {
    chai.expect(value.value).equals(4);
  });
});
