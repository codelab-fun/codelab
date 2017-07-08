import { isDecorator, isIdentifier, isObjectProperty } from 'babel-types';
import {
  babelTestSuite,
  expectClass,
  expectDecorator,
  expectExportedClass
} from '../../src/app/exercise/runners/ts-code-test-runner/babel-helpers';


const tests = [
  {
    title: `Create a class called 'AppModule'`,
    condition: expectClass('AppModule')
  },
  {
    title: `Export the class`,
    condition: expectExportedClass('AppModule')
  },
  {
    title: `Add a NgModule decorator for the class`,
    condition: expectDecorator('NgModule')
  },
  {
    title: `Add 'BrowserModule' to the NgModule decorator imports`,
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
    title: `Add 'AppComponent' to the 'declarations' property of the decorator`,
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
    title: `Add 'AppComponent' to the 'bootstrap' property of the decorator`,
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
