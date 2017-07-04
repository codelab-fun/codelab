import 'reflect-metadata';
import {
  babelTestSuite,
  expectClass,
  expectDecorator,
  expectDecoratorPropertyStringValue,
  expectExportedClass
} from '../../src/app/exercise/runners/ts-code-test-runner/babel-helpers';

const tests = [
  {
    title: `Create a class called 'AppComponent'`,
    condition: expectClass('AppComponent')
  },
  {
    title: `Export the class`,
    condition: expectExportedClass('AppComponent')
  },
  {
    title: `Add a Component decorator for the class`,
    condition: expectDecorator('Component')
  },
  {
    title: `Add a selector to the component decorator and set it to 'my-app'`,
    condition: expectDecoratorPropertyStringValue('Component', 'selector', 'my-app')
  }, {
    title: `Add a template that contains: '<h1>Hello MewTube!</h1>'`,
    condition: expectDecoratorPropertyStringValue('Component', 'template', '<h1>Hello MewTube!</h1>')
  },
];

export const createComponentTest = babelTestSuite('app.component.ts', tests);
