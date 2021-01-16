import { isDecorator, isIdentifier, isObjectProperty } from 'babel-types';
import {
  babelTestSuite,
  expectClass,
  expectDecorator,
  expectExportedClass
} from '../../apps/codelab/src/app/components/babel-test-runner/babel-helpers';


const tests = [
  {
    title: `@@createClassAppModule`,
    condition: expectClass('AppModule')
  },
  {
    title: `@@exportClass`,
    condition: expectExportedClass('AppModule')
  },
  {
    title: `@@addNgModuleDecorator`,
    condition: expectDecorator('NgModule')
  },
  {
    title: `@@addBrowserModuleToNgModule`,
    condition: (path) => {
      if (!isIdentifier(path.node, {name: 'BrowserModule'})) {
        return false;
      }

      const ObjectProperty = path.findParent(n => isObjectProperty(n));
      const Decorator = path.findParent(n => isDecorator(n));

      return ObjectProperty &&
        Decorator &&
        ObjectProperty.node.key.name === 'imports' &&
        Decorator.node.expression.callee.name === 'NgModule';
    }
  },
  {
    title: `@@addAppComponentToDeclarations`,
    condition: (path) => {
      if (!isIdentifier(path.node, {name: 'AppComponent'})) {
        return false;
      }

      const ObjectProperty = path.findParent(n => isObjectProperty(n));
      const Decorator = path.findParent(n => isDecorator(n));

      return ObjectProperty &&
        Decorator &&
        ObjectProperty.node.key.name === 'declarations' &&
        Decorator.node.expression.callee.name === 'NgModule';
    }
  },
  {
    title: `@@addAppComponentToBootstrap`,
    condition: (path) => {
      if (!isIdentifier(path.node, {name: 'AppComponent'})) {
        return false;
      }

      const ObjectProperty = path.findParent(n => isObjectProperty(n));
      const Decorator = path.findParent(n => isDecorator(n));

      return ObjectProperty &&
        Decorator &&
        ObjectProperty.node.key.name === 'bootstrap' &&
        Decorator.node.expression.callee.name === 'NgModule';
    }
  }
];


export const createModuleTest = babelTestSuite('app.module.ts', tests);
