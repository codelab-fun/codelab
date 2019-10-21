import { Component, OnInit, ViewChild } from '@angular/core';

import { extractMessages } from '@codelab/utils/src/lib/i18n/i18n-tools';
import { ng2tsConfig } from '../../../../../../../../ng2ts/ng2ts';
import {
  javaScriptWithConsoleLog,
  typeScriptWithConsoleLog
} from '../../../../shared/helpers/helpers';

declare const require;

@Component({
  selector: 'codelab-slides-typescript',
  templateUrl: './typescript.component.html',
  styleUrls: ['./typescript.component.css']
})
export class TypeScriptComponent implements OnInit {
  t: { [key: string]: string };
  // need to consider changing how we set code
  @ViewChild('translations', { static: true }) translation;

  // TODO(kirjs): we can't access tanslation in OnInit hook iwht static set to false
  private exercises = [ng2tsConfig.milestones[0].exercises[1]];
  private code: any = {};

  ngOnInit(): void {
    this.t = extractMessages(this.translation);

    this.code = {
      filter: typeScriptWithConsoleLog(`const numbers = [12,23,62,34,19,40,4,9];

console.log(numbers.filter(function(n: number){
  return n > 30;
}));

// ${this.t.useShorthandNotation}
// ${this.t.calledArrowFunction}
console.log(
  numbers.filter(n => n > 30)
);`),
      moreTypes: {
        codeInterfaces: `interface Puppy {
  name: string;
  age: number;
};

const realPuppy: Puppy = {
  name: 'Pikachu',
  age: 1
};

const notRealPuppy: Puppy = {
  says: 'meow' // ${this.t.errorNotAPuppy}
}`,
        codeArraysMatch: /Array/,
        codeArrays: typeScriptWithConsoleLog(`// Array<Type>
const cats: Array<string> = ['Simba', 'Aslan'];
// ${this.t.typeDoesSameThing}
const cats2: string[] = ['Simba', 'Aslan'];

interface Cat {
  name: string,
  age: number
}

const betterCats: Cat[] = [
  {name: 'Simba', age: 22},
  {name: 'Aslan', age: 9999}
];

console.log(betterCats);`),
        code: `const price: number = 100; // ${this.t.thisIsNumber}
const tax = 20; // ${this.t.typescriptCanInferNumber}
const productName = 'pikachu'; // ${this.t.typescriptCanInferString}
const isHungry = true; // Boolean

const weird = tax + isHungry; // ${this.t.cantAddNumAndBool}
tax.slice(1,5); // ${this.t.cantSliceNum}
productName.slice(1,5); // ${this.t.canSliceString}
const total = price + tax; // ${this.t.works}`
      },
      varDeclaration: {
        code: `// ${this.t.varAllowedNotRecommended}
var v = 1;

// ${this.t.letInsteadOfVar}
let l = 1;

if(true){
  let ll = 1; // ${this.t.letUnavailableOutsideIfUnlikeIf}
}
console.log(ll); // undefined


// ${this.t.constLikeLet}
const x = 1;
x = 2;`
      },
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
notSure = false; // ${this.t.definitelyBoolean}`
      },
      classDescription: {
        code: typeScriptWithConsoleLog(`export class Puppy {
  // ${this.t.commonDogName}
  name = 'Bar Boss';

  // ${this.t.thisIsMethod}
  bark(){
    // ${this.t.thatsHowRussianDogsTalk}
    return this.name + ': Gav gav!!';
  }
}

// ${this.t.nowWeCanInstantiate}
var hotdog = new Puppy();
// ${this.t.andUseItsMethods}
console.log(hotdog.bark());
`),
        codeConstructor: typeScriptWithConsoleLog(`export class Puppy {
  constructor(public name: string){
    // ${this.t.laterWeWillHaveCode}
  }
  bark(){
    return 'Gav! my name is ' + this.name;
  }
}

var hotdog = new Puppy('Édouard');
console.log(hotdog.bark());
// ${this.t.letsCreateMorePuppies}
var oscar = new Puppy('Oscar-Claude');
console.log(oscar.bark());`),
        codeExport: typeScriptWithConsoleLog(`export class Puppy {
  constructor(public name: string){}
  bark(){
    return 'Gav! my name is ' + this.name;
  }
}`),
        codeImport: typeScriptWithConsoleLog(
          `import {Puppy} from './puppy';

var hotdog = new Puppy('Édouard');
console.log(hotdog.bark());
// ${this.t.letsCreateMorePuppies}
var oscar = new Puppy('Oscar-Claude');
console.log(oscar.bark());`,
          'import "./app";',
          undefined,
          `export class Puppy {
  constructor(public name: string){}
  bark(){
    return 'Gav! my name is ' + this.name;
  }
}`
        ),
        matches: {
          classPuppyMatch: { 'app.ts': /class Puppy/ },
          classMatch: /class/,
          exportMatch: /export/,
          importMatch: {
            'puppy.ts': /export/,
            'app.ts': /import/
          },
          arrayMatch: {
            'app.ts': [/Array<string>/, /string\[]/]
          },
          constants: /const /,

          constructorMatch: { 'app.ts': [/(public name: string)/, /Édouard/] },
          modifierMatch: { 'app.ts': [/public name/, /this.name/] },
          oscarMatch: /Oscar-Claude/
        }
      },
      tsExercise: typeScriptWithConsoleLog(
        `function add(a: number, b){
  return a+b;
};

console.log(add(2, '2'));`,
        undefined,
        require(`!raw-loader!./code/mini-exercise-test.ts`)
          .replace('@@specifyTheTypeForB', this.t.specifyTheTypeForB)
          .replace(
            '@@typescriptHighlightsErrorFix224',
            this.t.typescriptHighlightsErrorFix224
          )
      ),

      js2And2: (() => {
        const code = javaScriptWithConsoleLog(
          `function add(a, b){
  return a+b;
};

console.log(add(2, '2'));`
        );
        (code.files[2] as any).bootstrap = false;
        return code;
      })(),
      tsExerciseMatch: { 'app.ts': /'.*'/ }
    };
  }
}
