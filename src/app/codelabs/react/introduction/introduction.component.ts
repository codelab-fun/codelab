import { Component } from '@angular/core';
import { reactExercise } from '../../../exercise/helpers/helpers';
import tester from './introduction/exercise/test';

const jsxComponent = `
function HelloWorldComponent() {
  return (
    <h1>Hello, world!</h1>
  );
}
`.trim();

const jsComponent = `
function HelloWorldComponent() {
  return (
    React.createElement('h1', null, 'Hello, world!')
  );
}
`.trim();

const jsxRender = `
function HelloWorldComponent() {
  return (
    <h1>Hello, world!</h1>
  );
}

ReactDOM.render(<HelloWorldComponent />, document.querySelector('#app'));
`.trim();

const arrowFunctionRender = `
const HelloWorldComponent = () => <h1>Hello, world!</h1>;

ReactDOM.render(<HelloWorldComponent />, document.querySelector('#app'));
`.trim();

const jsRender = `
const HelloWorldComponent = () => React.createElement('h1', null, 'Hello, world!');

ReactDOM.render(React.createElement(HelloWorldComponent, null, null), document.querySelector('#app'));
`.trim();

@Component({
  selector: 'slides-react',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent {

  code = {
    jsxComponent,
    jsComponent,
    jsxRender,
    arrowFunctionRender,
    jsRender,
    basic: {
      ...reactExercise(`ReactDOM.render(React.createElement('div', null, 'Hello world'), document.querySelector('#app'))`),
      runner: 'React'
    }
  };

  highlightMatches = {
    jsx: /\<.*\>/,
    createElement: /React\.createElement.*'\)/,
    ReactDOM: /ReactDOM.*'\)/,
    arrowFunction: /const.*\>;/
  };

  exercise = {
    runner: 'React',
    files: [
      'introduction/exercise/app.js',
      'introduction/exercise/index.html'
    ],
    tester: tester
  };
}
