import {
  babelTestSuite,
  expectClass,
  expectDecorator,
  expectDecoratorPropertyStringValue,
  expectExportedClass
} from '../../apps/codelab/src/app/components/babel-test-runner/babel-helpers';

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
    condition: expectDecoratorPropertyStringValue(
      'Component',
      'selector',
      'my-app'
    )
  },
  {
    title: `@@addTemplateHelloMewTube`,
    condition: expectDecoratorPropertyStringValue(
      'Component',
      'template',
      /<h1>\s*Hello MewTube!\s*<\/h1>/
    )
  }
];

export const createComponentTest = babelTestSuite('app.component.ts', tests);
