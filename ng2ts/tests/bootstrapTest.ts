import { babelTestSuite } from '../../src/app/exercise/runners/ts-code-test-runner/babel-helpers';
import { isCallExpression, isIdentifier } from 'babel-types';

const tests = [
  {
    title: `All set! Bootstrap your application`,
    condition: ({node, parent}) =>
    isIdentifier(node, {name: 'AppModule'}) && isCallExpression(parent) && parent.callee.property.name === 'bootstrapModule'
  }
];

export const createBootstrapTest = babelTestSuite('main.ts', tests);
