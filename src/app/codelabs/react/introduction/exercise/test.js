import {
  babylon,
  babel_traverse as traverse,
  babel_types as T
} from '../code';

export default function test(sourceCode) {
  const tests = [
    {
      instruction: `Create a function named App`,
      condition: ({ node }) => {
        const isFunction = T.isFunctionDeclaration(node) && node.id.name === 'App';
        const isVariable = T.isVariableDeclarator(node) && node.id.name === 'App';

        return isFunction || (isVariable && T.isFunctionExpression(node.init)) || (isVariable && T.ArrowFunctionExpression(node.init))
      }
    },
    {
      instruction: `Return div with some text using JSX`,
      condition: ({ node }) => {
        const isDiv = (element) =>
          T.isJSXElement(element)
          (T.isJSXOpeningElement(element.openingElement) && element.openingElement.name.name === 'div') &&
          (T.isJSXOpeningElement(element.closingElement) && element.closingElement.name.name === 'div');

        const returnStatement = T.isReturnStatement(node) && isDiv(node.argument);
        const arrowBodyStatement = T.isArrowFunctionExpression(node) && isDiv(node.body);

        return returnStatement || arrowBodyStatement;
      }
    },
    {
      instruction: `Switch JSX to JavaScript syntax in ReactDOM.render()`,
      condition: ({ node, parent }) => {
        const createElementStatement =
          T.isMemberExpression(node) &&
          node.object.name === 'React' &&
          node.property.name === 'createElement' &&
          T.isCallExpression(parent.node) &&
          parent.node.arguments[0].name === 'App' &&
          T.isNullLiteral(parent.node.arguments[1]) &&
          T.isNullLiteral(parent.node.arguments[2]);

        const renderStatement =
          T.isCallExpression(parent.parent.node) &&
          parent.parent.node.callee.object === 'ReactDOM' &&
          parent.parent.node.callee.property === 'render';

        return renderStatement && createElementStatement;
      }
    },
    {
      instruction: `Return JavaScript instead of JSX in App component`,
      condition: (path) => {
        const isJsDiv = (element) =>
          T.isMemberExpression(node) &&
          node.object.name === 'React' &&
          node.property.name === 'createElement' &&
          T.isCallExpression(parent.node) &&
          parent.node.arguments[0].name === 'div' &&
          T.isNullLiteral(parent.node.arguments[1]) &&
          T.isStringLiteral(parent.node.arguments[2]);

        const returnStatement = T.isReturnStatement(node) && isJsDiv(node.argument);
        const arrowBodyStatement = T.isArrowFunctionExpression(node) && isJsDiv(node.body);

        return returnStatement || arrowBodyStatement;
      }
    }
  ];

  const ast = babylon.parse(sourceCode, { sourceType: 'module' });

  traverse(ast, {
    enter(path) {
      tests.forEach((test) => { test.result = test.result || test.condition(path) });
    }
  });

  return tests;
}
