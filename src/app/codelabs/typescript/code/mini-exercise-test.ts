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
  it(`"b" in the code below is highlighted, because TypeScript is missing the type. Specify the type for b.`, () => {
    const func = getFunctionNode(app_ts_AST);
    chai.assert(func.parameters[1].type && func.parameters[1].type.kind === ts.SyntaxKind.NumberKeyword, 'Test failed: b is not a number');
  });

  it('With this information TypeScript can highlight the error. Fix it, make 2 + 2 = 4 again!', () => {
    chai.expect(value.value).equals(4);
  });
});
