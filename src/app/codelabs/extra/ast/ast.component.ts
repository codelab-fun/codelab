import { Component } from '@angular/core';
import { exercise } from '../../../exercise/helpers/helpers';
import { parse } from 'babylon';
import {
  findHighlightsObjectProp,
  isBody,
  isLoc,
  isType,
  parseCode,
  processCode,
  removeDoubleWhiteLines,
  removeLoc
} from './parse-hello-world-ast';


declare const require;


const helloWorld = JSON.parse(require('!!raw-loader!./samples/hello-world.json'));


function jsify(program) {
  return 'const ast = ' + JSON.stringify(program, null, '  ');
}

const helloWorldCodePre = jsify(helloWorld);


const debuggerCode = `debugger`;
const debuggerAndConsoleLog = 'debugger;\nconsole.log("Hello world!");';
const debuggerAndConsoleLogAst =
  removeDoubleWhiteLines(processCode(jsify(parseCode(debuggerAndConsoleLog).program.body),
    {remove: [removeLoc]}));

@Component({
  selector: 'slides-ast',
  templateUrl: './ast.component.html',
  styleUrls: ['./ast.component.css']
})
export class AstComponent {
  fontSize = 28;

  code = {
    matches: {loc: /"loc": \{[\s\S]*?\{[\s\S]*?\}[\s\S]*?\{[\s\S]*?\}[\s\S]*?\},/},
    astExampleFull: processCode(helloWorldCodePre, {remove: []}),
    astExample: removeDoubleWhiteLines(processCode(helloWorldCodePre, {remove: [removeLoc]})),
    astExampleNoBody: removeDoubleWhiteLines(processCode(jsify(helloWorld.program.body),
      {remove: [removeLoc]})),
    consoleLog: debuggerCode,
    debuggerAndConsoleLog,
    debuggerAndConsoleLogAst,
    findDebugger: [
      exercise('find-debugger', require('!!raw-loader!./samples/find-debugger/find-debugger.js'),
        require('!!raw-loader!./samples/find-debugger/find-debugger-regex.solved.js')),
      exercise('find-debugger.test', require('!!raw-loader!./samples/find-debugger/find-debugger.test.js'))
    ],
    findDebuggerBabel: [
      exercise('find-debugger-babel',
        require('!!raw-loader!./samples/find-debugger/find-debugger-babel.ts'),
        require('!!raw-loader!./samples/find-debugger/find-debugger-babel.solved.ts')),
      exercise('find-debugger.test', require('!!raw-loader!./samples/find-debugger/find-debugger.test.js')),
    ],
    traverseDebuggerBabel: [
      exercise('traverse-debugger-babel', require('!!raw-loader!./samples/find-debugger/traverse-debugger-babel.ts'),
        require('!!raw-loader!./samples/find-debugger/traverse-debugger-babel.solved.ts')),
      exercise('find-debugger.test', require('!!raw-loader!./samples/find-debugger/find-debugger.test.js')),
    ],
    removeDebuggerBabel: [
      exercise('remove-debugger', require('!!raw-loader!./samples/find-debugger/remove-debugger.ts'),
        require('!!raw-loader!./samples/find-debugger/remove-debugger.solved.ts')),
      exercise('remove-debugger.test', require('!!raw-loader!./samples/find-debugger/remove-debugger.test.js')),
    ],
    findfIt: [
      exercise('find-fit', require('!!raw-loader!./samples/find-fit/find-fit.js'),
        require('!!raw-loader!./samples/find-fit/find-fit.solved.js')),
      exercise('find-fit.test', require('!!raw-loader!./samples/find-fit/find-fit.test.js')),
    ],
    itLines: [
      exercise('it-lines', require('!!raw-loader!./samples/it-lines/it-lines.js'),
        require('!!raw-loader!./samples/it-lines/it-lines.solved.js')),
      exercise('it-lines.test', require('!!raw-loader!./samples/it-lines/it-lines.test.js')),
    ],
    decToBin: require('!!raw-loader!./samples/dec-to-bin.js'),
    decToBinFixed: require('!!raw-loader!./samples/dec-to-bin-with-semicolons.js')

  };

  matchTreePartsLoc(code) {
    return findHighlightsObjectProp(code, [isLoc]);
  }

  matchTreePartsBody(code) {
    return findHighlightsObjectProp(code, [isBody]);
  }

  matchTreePartsType(code) {
    return findHighlightsObjectProp(code, [isType]);
  }

  updateFontSize(diff) {
    this.fontSize += diff;
  }

  constructor() {

  }
}
