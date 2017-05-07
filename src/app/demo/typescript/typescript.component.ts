import {Component} from '@angular/core';
import {typeScriptWithConsoleLog} from '../../exercise/helpers/helpers';
import {ng2tsConfig} from '../../../../ng2ts/ng2ts';


@Component({
  selector: 'app-typescript',
  templateUrl: './typescript.component.html',
  styleUrls: ['./typescript.component.css']
})

export class TypescriptComponent {
  code = {
    moreTypes: {
      codeInterfaces: `interface Puppy {
  name: string;
  age: number;
};
 
const realPuppy: Puppy = {
  name: 'Pickachu',
  age: 1
}; 

const notRealPuppy: Puppy = {
  type: 'cat' // Error: this is clearly not a puppy
}`,
      codeArrays: `// Array<Type> is one way of defining an array.
const fruit: Array<string> = ['Banana', 'Mango'];  
// Type[] does the same thing.
const moreFruit: string[] = ['Banana', 'Mango']; 

interface Fruit { 
  name: string,
  sweet: boolean
}

const betterFruit: Array<Fruit> = [{name: 'banana', sweet: true}];
 
`,
      code: `const price: number = 100; // This is a number.
const tax = 20; // Actually TypeScript can infer number here;      
const productName = 'pikachu'; // TypeScript can infer it's a string.
const isHungry = true; // Boolean

const weird = tax + isHungry; // Can't add number and boolean
tax.slice(1,5); // Can't slice a number
productName.slice(1,5); // But can slice a string!
const total = price + tax; // Works!`
    },
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
      code: typeScriptWithConsoleLog(`export class Puppy {
  // This is a method.    
  bark(){
    // That's how russian dogs talk.
    return 'Gav gav!!';
  }
}

// Now we can instantiate (create) it 
var hotdog = new Puppy();
// And use its methods
console.log(hotdog.bark());
`),
      codeConstructor: typeScriptWithConsoleLog(`export class Puppy {
  constructor(public name: string){}
  bark(){
    return 'Gav! my name is ' + this.name;
  }
}

var hotdog = new Puppy('Édouard');
console.log(hotdog.bark());
// Let's create more puppies
var oscar = new Puppy('Oscar-Claude');
console.log(oscar.bark());`), codeExport: typeScriptWithConsoleLog(`export class Puppy {
  constructor(public name: string){}
  bark(){
    return 'Gav! my name is ' + this.name;
  }
}`), codeImport: typeScriptWithConsoleLog(`import {Puppy} from './puppy.ts';

var hotdog = new Puppy('Édouard');
console.log(hotdog.bark());
// Let's create more puppies
var oscar = new Puppy('Oscar-Claude');
console.log(oscar.bark());`, 'import "app.ts";', undefined, `export class Puppy {
  constructor(public name: string){}
  bark(){
    return 'Gav! my name is ' + this.name;
  }
}`),
      matches: {
        classPuppyMatch: /class Puppy/,
        classMatch: /class/,
        exportMatch: /export/,
        importMatch: /import/,
        constants: /const /,
        constructorMatch: /constructor/,
        publicMatch: /public name/,
        thisMatch: /this.name/,
        edouardMatch: /Édouard/,
        oscarMatch: /Oscar-Claude/,
      }
    },
    tsExercise: typeScriptWithConsoleLog(
      `function add(a: number, b: number){
  return a+b;
};

console.log(add('2', 2));`, undefined,
      `
    import {value} from 'app.ts';
    
    describe('value', ()=>{
      it('equals 5', ()=>{
        chai.expect(value.value).equals(4);
      })
    })
    `),
    tsExerciseMatch: /'.*'/
  };
  exercises = [
    ng2tsConfig.milestones[0].exercises[1]
  ];
}

