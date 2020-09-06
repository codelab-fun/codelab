import { Component, Input, OnInit } from '@angular/core';

export interface StackFunction {
  inputs: string;
  outputs: string;
  name?: string;
}

export interface Level {
  functions: StackFunction[];
  inputs: string;
  outputs: string;
}

const ANY_CHAR = '＊';

@Component({
  selector: 'slides-stack-game',
  templateUrl: './stack-game.component.html',
  styleUrls: ['./stack-game.component.css']
})
export class StackGameComponent implements OnInit {
  isComplete = false;

  @Input() level: Level = {
    functions: [
      {
        inputs: '',
        outputs: '🍏',
        name: 'push 🍏'
      },
      {
        inputs: '🍏🍏',
        outputs: '🍋'
      },
      {
        inputs: '🍋🍋',
        outputs: '🍒'
      },
      {
        inputs: '＊',
        outputs: '',
        name: 'pop'
      }
    ],
    inputs: '🍏',
    outputs: '🍒'
  };

  functions = [];
  stack = '';
  history: string[];

  canAddFunction(stack: string, func) {
    return stack.match(new RegExp(func.inputs.replace(ANY_CHAR, '.') + '$'));
  }

  calcStack() {
    let stack = this.level.inputs.replace(ANY_CHAR, '🍏');
    const history = [];
    for (const func of this.functions) {
      stack =
        stack.slice(
          0,
          stack.length - func.inputs.replace(ANY_CHAR, '🍏').length
        ) + func.outputs;
      history.push(stack);
    }
    this.history = history;
    this.stack = stack;
    if (this.stack === this.level.outputs) {
      this.isComplete = true;
    }
  }

  addFunction(func: StackFunction) {
    this.functions.push(func);
    this.calcStack();
  }

  removeFunction() {
    this.functions.pop();
    this.calcStack();
  }

  ngOnInit() {
    this.stack = this.level.inputs;
  }
}
