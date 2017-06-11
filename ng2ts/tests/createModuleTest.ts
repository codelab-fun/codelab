import {AppModule} from '../app.module';
import {
  babylon,
  app_module_ts as sourceCode,
  babel_traverse as traverse,
  babel_types as T
} from '../code';

let testResults;

const tests = [
  {
    instruction: `Create a class called 'AppModule'`,
    condition: ({ node, parent }) =>
      T.isIdentifier(node, { name: 'AppModule' }) &&
      T.isClassDeclaration(parent, { superClass: null })
  },
  {
    instruction: `Export the class`,
    condition: ({ node, parent, parentPath }) =>
      T.isIdentifier(node, { name: 'AppModule' }) &&
      T.isClassDeclaration(parent, { superClass: null }) &&
      T.isExportNamedDeclaration(parentPath.parent)
  },
  {
    instruction: `Add a NgModule decorator for the class`,
    condition: ({ node }) =>
      T.isDecorator(node)
        ? node.expression.callee.name === 'NgModule'
        : false
  },
  {
    instruction: `Add 'BrowserModule' to the NgModule decorator imports`,
    condition: (path) => {
      if (!T.isIdentifier(path.node, { name: 'BrowserModule' })) {
        return false;
      }

      const ObjectProperty = path.findParent(n => T.isObjectProperty(n));
      const Decorator = path.findParent(n => T.isDecorator(n));

      return ObjectProperty &&
             Decorator &&
             ObjectProperty.node.key.name === 'imports' &&
             Decorator.node.expression.callee.name === 'NgModule';
    }
  },
  {
    instruction: `Add 'AppComponent' to the 'declarations' property of the decorator`,
    condition: (path) => {
      if (!T.isIdentifier(path.node, { name: 'AppComponent' })) {
        return false;
      }

      const ObjectProperty = path.findParent(n => T.isObjectProperty(n));
      const Decorator = path.findParent(n => T.isDecorator(n));

      return ObjectProperty &&
             Decorator &&
             ObjectProperty.node.key.name === 'declarations' &&
             Decorator.node.expression.callee.name === 'NgModule';
    }
  },
  {
    instruction: `Add 'AppComponent' to the 'bootstrap' property of the decorator`,
    condition: (path) => {
      if (!T.isIdentifier(path.node, { name: 'AppComponent' })) {
        return false;
      }

      const ObjectProperty = path.findParent(n => T.isObjectProperty(n));
      const Decorator = path.findParent(n => T.isDecorator(n));

      return ObjectProperty &&
             Decorator &&
             ObjectProperty.node.key.name === 'bootstrap' &&
             Decorator.node.expression.callee.name === 'NgModule';
    }
  }
];

before(() => {
  testResults = Array(tests.length).fill(false);

  const ast = babylon.parse(sourceCode, {
    sourceType: 'module',
    plugins: ['decorators']
  });

  traverse(ast, {
    enter(path) {
      tests.forEach((test, index) => {
        if (test.condition(path)) {
          testResults[index] = true
        }
      });
    }
  });
});

describe('Component', () => {
  tests.forEach((test, index) =>
    it(test.instruction, () => chai.expect(testResults[index]).equals(true))
  );
});

