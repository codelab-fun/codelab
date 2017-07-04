import * as T from 'babel-types';
import * as babylon from 'babylon';
import babel_traverse from 'babel-traverse';

export const expectClass = (name) => ({node, parent}) =>
T.isIdentifier(node, {name}) && T.isClassDeclaration(parent, {superClass: null});


export const expectExportedClass = (name) => ({node, parent, parentPath}) =>
expectClass(name)({node, parent}) && T.isExportNamedDeclaration(parentPath.parent);

export const expectDecorator = (name) => ({node}) => T.isDecorator(node) && node.expression.callee.name === name;

export const expectDecoratorPropertyStringValue = (decoratorName, keyName, value) => (path) => {
  return T.isStringLiteral(path.node, {value}) && T.isObjectProperty(path.parent) && path.parent.key.name === keyName &&
    path.findParent(T.isDecorator).node.expression.callee.name === decoratorName;
};


export function babelTestSuite(filePath, tests) {
  return function test(files) {
    const results = tests.map(({title}) => ({title, pass: false}));
    const code = files.find(file => file.path === filePath).code;

    const ast = babylon.parse(code, {
      sourceType: 'module',
      plugins: ['decorators']
    });


    babel_traverse(ast, {
      enter(path) {
        tests.forEach((test, index) => {
          try {
            results[index].pass = results[index].pass || test.condition(path);
          } catch (e) {
            console.log(e);
          }
        });
      }
    });

    return results;
  };
}
