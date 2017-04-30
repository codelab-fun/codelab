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
    varDeclaration: {
      code: `// Var is still allowed but not recommended.
var v = 1;         

// Let should be used instead of var.
let l = 1;

if(true){
  let ll = 1; // Unlike var let is unavailable outside of this if.
}
console.log(ll); // undefined       


// Const is like let, but if you try to change it, TS will give you an error.
const x = 1;
x = 2;`

    },
    stringType: {
      code: `let fullName: string = 'Bob Bobbington';
let sentence: string = \`Hello, my name is \${ fullName }.\`;`
    }
    ,
    stringType2: {
      code: `let sentence: string = "Hello, my name is " + fullName + "."`
    }
    ,
    anyType: {
      code: `let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean`
    }
    ,
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
    }
    ,
    tsExercise: pureJavascript
    (`
      function add(a: number, b: number){
        return a+b
      };

      display(add('2', 2));

    `, `
    import {value} from 'app.ts';
    document.write('<h1>' + value.value + '</h1>');`,
      `
    import {value} from 'app.ts';

    describe('value', ()=>{
      it('equals 5', ()=>{
        chai.expect(value.value).equals(4);
      })
    })
    `),
    tsExerciseMatch: /'.*'/
  }
  ;
  exercises = [
    ng2tsConfig.milestones[0].exercises[1]
  ]
}

