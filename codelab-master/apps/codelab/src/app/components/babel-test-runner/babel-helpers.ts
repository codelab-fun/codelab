import * as T from 'babel-types';
import * as babylon from 'babylon';
import babel_traverse from '@babel/traverse';
import { getTypeScript } from '@codelab/utils/src/lib/loaders/loaders';
import * as TsTypes from 'typescript';

const ts = getTypeScript();

function matchesValue(actual, expected) {
  if (!actual) {
    return false;
  }
  if (expected instanceof RegExp) {
    return expected.test(actual);
  }

  return actual.trim() === expected.trim();
}

export const expectClass = name => ({ node, parent }) =>
  T.isIdentifier(node, { name }) &&
  T.isClassDeclaration(parent, { superClass: null });

export const expectExportedClass = name => ({ node, parent, parentPath }) =>
  expectClass(name)({ node, parent }) &&
  T.isExportNamedDeclaration(parentPath.parent);

export const expectDecorator = name => ({ node }) =>
  T.isDecorator(node) && node.expression.callee.name === name;

export const expectDecoratorPropertyStringValue = (
  decoratorName,
  keyName,
  value
) => path => {
  function matchesTemplateLiteral() {
    return (
      T.isTemplateLiteral(path.node) &&
      matchesValue(path.node.quasis[0].value.raw, value)
    );
  }

  function matchesStringLiteral() {
    return T.isStringLiteral(path.node) && matchesValue(path.node.value, value);
  }

  return (
    (matchesTemplateLiteral() || matchesStringLiteral()) &&
    T.isObjectProperty(path.parent) &&
    path.parent.key.name === keyName &&
    path.findParent(T.isDecorator).node.expression.callee.name === decoratorName
  );
};

export function babelTestSuite(filePath, tests) {
  return function test(files) {
    const results = tests.map(({ title }) => ({ title, pass: false }));
    const code = files[filePath];

    const ast = babylon.parse(code, {
      sourceType: 'module',
      plugins: ['decorators']
    });

    babel_traverse(ast, {
      enter(path) {
        tests.forEach((testConfig, index) => {
          try {
            results[index].pass =
              results[index].pass || testConfig.condition(path);
          } catch (e) {
            console.log(e);
          }
        });
      }
    });

    return results;
  };
}

export type Predicate = (node: TsTypes.Node) => boolean;

export class MiniTsQuery {
  constructor(private readonly ast: TsTypes.Node) {}

  some(predicate: Predicate) {
    let result = false;

    this.traverse(this.ast, node => {
      if (predicate(node)) {
        result = true;
      }
    });

    return result;
  }

  findOne(predicate) {
    let result;

    this.traverse(this.ast, node => {
      if (!result && predicate(node)) {
        result = node;
      }
    });

    return result;
  }

  hasOne(predicate) {
    return !!this.findOne(predicate);
  }

  hasIdentifier(identifier: string) {
    return !!this.getIdentifier(identifier);
  }

  getIdentifier(identifier: string) {
    return this.findOne(
      node => ts.isIdentifier(node) && node.text === identifier
    );
  }

  hasConstructorParam(identifier: string, type: string) {
    const node = this.findOne(
      node => ts.isIdentifier(node) && node.text === identifier
    );

    return node ? node.parent.type.typeName.text === type : undefined;
  }

  hasVariableDeclaration(identifier: string) {
    const node = this.getIdentifier(identifier);
    return node && ts.isVariableDeclaration(node.parent) ? node : undefined;
  }

  hasDecorator(type: string) {
    return !!this.getDecorator(type);
  }

  hasDecoratorValue(decoratorType: string, property: string, type: string) {
    const decorator = this.getDecorator(decoratorType);
    if (
      decorator.expression &&
      ts.isCallExpression(decorator.expression) &&
      decorator.expression.arguments &&
      decorator.expression.arguments[0] &&
      ts.isObjectLiteralExpression(decorator.expression.arguments[0])
    ) {
      return (decorator.expression.arguments[0] as any).properties
        .filter(prop => prop && prop.name && prop.name.text === property)
        .some(arrayValue =>
          arrayValue.initializer.elements.some(a => a.text === type)
        );
    }
    return false;
  }

  hasProvider(type: string) {
    return this.hasDecoratorValue('NgModule', 'providers', 'VideoService');
  }

  getDecorator(type: string): TsTypes.Decorator {
    return this.findOne(node => {
      return (
        ts.isDecorator(node) &&
        node.expression &&
        ts.isCallExpression(node.expression) &&
        node.expression.expression &&
        ts.isIdentifier(node.expression.expression) &&
        node.expression.expression.text === type
      );
    });
  }

  private traverse(node, callback) {
    callback(node);
    ts.forEachChild(node, node => this.traverse(node, callback));
  }
}

export function tsAstTestSuite(tests) {
  return function test(files) {
    const results = tests.map(({ title }) => ({ title, pass: false }));
    const astCache = {};

    function getAst(filePath) {
      if (!astCache[filePath]) {
        astCache[filePath] = new MiniTsQuery(
          ts.createSourceFile(
            filePath,
            files[filePath],
            ts.ScriptTarget.ES2015,
            /*setParentNodes */ true
          )
        );
      }
      return astCache[filePath];
    }

    tests.forEach((testConfig, index) => {
      try {
        if (!testConfig.file) {
          throw new Error('test must specify a file');
        }
        results[index].pass =
          results[index].pass || testConfig.condition(getAst(testConfig.file));
      } catch (e) {
        console.log(e);
      }
    });
    return results;
  };
}
