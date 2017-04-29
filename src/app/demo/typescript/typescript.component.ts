import {Component} from '@angular/core';
import {pureJavascript} from '../../exercise/helpers/helpers';
import {ng2tsConfig} from '../../../../ng2ts/ng2ts';


@Component({
  selector: 'app-typescript',
  templateUrl: './typescript.component.html',
  styleUrls: ['./typescript.component.css']
})

export class TypescriptComponent {
  title = 'TypeScript';
  description = '';
  prereqs = '';

  code = {
    stringType: {
      code: `let fullName: string = 'Bob Bobbington';
let sentence: string = \`Hello, my name is \${ fullName }.\`;`
    },
    stringType2: {
      code: `let sentence: string = "Hello, my name is " + fullName + "."`
    },
    anyType: {
      code: `let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean`
    },
    classDescription: {
      code: `export class Hello {
  constructor(private name: string){}
  hello(){
     const greeting = 'Hello';
		 return \`\${greeting} \${name}!\`;
  }
}

import {Hello} from 'Hello';
console.log(new Hello('World').hello())
`,
      matches: {
        class: /class/,
        export: /export/,
        import: /import/,
        constants: /const /
      }
    },
    tsExercise: pureJavascript(`
      function add(a: number, b: number){
        return a+b
      };

      display(add('1', 4));

    `, `
    import {value} from 'app.ts';
    document.write('<h1>' + value.value + '</h1>');`),
    tsExerciseMatch: /'.*'/
  };
  exercises = [
    ng2tsConfig.milestones[0].exercises[1]
  ]
}

