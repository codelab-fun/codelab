import 'reflect-metadata';
import {
  babelTestSuite,
  expectClass,
  expectDecorator,
  expectDecoratorPropertyStringValue,
  expectExportedClass
} from '../../libs/exercise/src/runners/ts-code-test-runner/babel-helpers';

const tests = [
  {
    title: `@@createClassAppComponent`,
    condition: expectClass('AppComponent')
  },
  {
    title: `@@exportClass`,
    condition: expectExportedClass('AppComponent')
  },
  {
    title: `@@addComponentDecorator`,
    condition: expectDecorator('Component')
  },
  {
    title: `@@addSelectorMyApp`,
    condition: expectDecoratorPropertyStringValue('Component', 'selector', 'my-app')
  }, {
    title: `@@addTemplateHelloMewTube`,
    condition: expectDecoratorPropertyStringValue('Component', 'template', '<h1>Hello MewTube!</h1>')
  },
];

export const createComponentTest = babelTestSuite('app.component.ts', tests);
