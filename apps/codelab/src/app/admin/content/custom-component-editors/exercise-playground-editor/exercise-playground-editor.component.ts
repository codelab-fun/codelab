import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'codelab-exercise-playground-editor',
  templateUrl: './exercise-playground-editor.component.html',
  styleUrls: ['./exercise-playground-editor.component.css']
})
export class ExercisePlaygroundEditorComponent implements OnInit {
  constructor() {}

  exercise = {
    files: [
      {
        bootstrap: false,
        excludeFromTesting: false,
        type: 'typescript',
        path: 'app.ts',
        template:
          "function add(a, b){\n  return a+b;\n};\n\nconsole.log(add(2, '2'));",
        code:
          "function add(a, b){\n  return a+b;\n};\n\nconsole.log(add(2, '2'));",
        moduleName: 'app',
        solution:
          "function add(a, b){\n  return a+b;\n};\n\nconsole.log(add(2, '2'));",
        after: 'export function evalJs( js ){ return eval(js);}',
        before:
          "\n\n    export const value = window.value = window.value || {};\n\n    function wrap(context, prop, callback){\n      if(!context[prop].patched){\n        const originalMethod = context[prop];\n\n         context[prop] = function(...args){\n          callback(...args);\n          return originalMethod.apply(context, args);\n         }\n\n         context[prop].patched = true;\n       }\n    }\n\n    /* TODO: Get rid of the CSS hack */\n\n    wrap(console, 'log', (v)=>{\n      value.value = v;\n      document.body.innerHTML += '<pre style=\"font-family: roboto-mono, monospace;font-size: 3vw; font-weight: 400; margin: 0;\">' +\n       '<span style=\"color: #999;font-size: 2vw;\">＜</span> ' + JSON.stringify(v, null, '  ') + '</pre> ' +\n       '<hr style=\"margin-left: 2vw;border: 0 solid;\">'\n         document.body.scrollTop = document.body.scrollHeight;\n    })\n  ",
        editorType: 'javascript'
      },
      {
        bootstrap: true,
        excludeFromTesting: true,
        type: 'typescript',
        path: 'main.ts',
        template: 'import "./app";',
        code: 'import "./app";',
        moduleName: 'main',
        solution: 'import "./app";'
      },
      {
        path: 'testTest.ts',
        type: 'typescript',
        template: '',
        code: '',
        moduleName: 'testTest',
        excludeFromTesting: false,
        test: true,
        bootstrap: false,
        before: 'mochaBefore();',
        after: 'mochaAfter();',
        hidden: true
      }
    ]
  };

  ngOnInit(): void {}
}
