import { babylon, esquery } from '../code';

export default function test(sourceCode) {
  const tests = [
    {
      instruction: `Create a function named App`,
      queries: [
        'FunctionDeclaration[id.name=App]',
        'VariableDeclarator[id.name=App] > FunctionExpression',
        'VariableDeclarator[id.name=App] > ArrowFunctionExpression'
      ].join(',')
    },
    {
      instruction: `Return div with some text using JSX`,
      queries: [
        'ReturnStatement > JSXElement[openingElement.name.name=div][closingElement.name.name=div]',
        'ArrowFunctionExpression > JSXElement[openingElement.name.name=div][closingElement.name.name=div]'
      ].join(',')
    },
    {
      instruction: `Switch JSX to JavaScript syntax in ReactDOM.render()`,
      queries: [
        'CallExpression[callee.object.name=ReactDOM][callee.property.name=render] >' +
        'CallExpression[callee.object.name=React][callee.property.name=createElement][arguments] >' +
        'Literal[value=App]'
      ].join('')
    },
    {
      instruction: `Return JavaScript instead of JSX in App component`,
      queries: [
        `ReturnStatement > CallExpression[callee.object.name=React]
                                         [callee.property.name=createElement]
                                         [arguments.0.value=div]
                                         [arguments.2.type=Literal]`
      ].join('')
    }
  ];

  const ast = babylon.parse(sourceCode, { sourceType: 'module', plugins: ['estree'] });

  return tests.map((test) => ({
    ...test,
    result: test.result || !!esquery(ast.program, test.queries).length
  }));
}
