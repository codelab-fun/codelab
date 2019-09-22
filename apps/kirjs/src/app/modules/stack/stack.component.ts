import { Component, OnInit } from '@angular/core';
import { Level } from './stack-game/stack-game.component';

@Component({
  selector: 'kirjs-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {
  itIsALemon = false;

  levels: Record<string, Level> = {
    push: {
      functions: [
        {
          inputs: '',
          outputs: '🍏',
          name: 'push 🍏'
        },
        {
          inputs: '',
          outputs: '🍋',
          name: 'push 🍋'
        }
      ],
      inputs: '',
      outputs: '🍏🍋🍏'
    },

    pop: {
      functions: [
        {
          inputs: '＊',
          outputs: '',
          name: 'pop'
        }
      ],
      inputs: '🍏🍏🍏🍏🍏',
      outputs: '🍏'
    },

    together: {
      functions: [
        {
          inputs: '＊',
          outputs: '',
          name: 'pop'
        },
        {
          inputs: '',
          outputs: '🍓',
          name: 'push 🍓'
        },
        {
          inputs: '',
          outputs: '🍋',
          name: 'push 🍋'
        }
      ],
      inputs: '🍏🍏',
      outputs: '🍓🍋'
    },

    lemonade: {
      functions: [
        {
          inputs: '',
          outputs: '💦'
        },
        {
          inputs: '',
          outputs: '🍋'
        },
        {
          inputs: '',
          outputs: '🍒'
        },
        {
          inputs: '🍒💦🍋',
          outputs: '🍹'
        }
      ],
      inputs: '',
      outputs: '🍹'
    },
    level1: {
      functions: [
        {
          inputs: '',
          outputs: '🍏🍏'
        },
        {
          inputs: '',
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
    },
    level2: {
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
    }
  };

  constructor() {}

  ngOnInit() {}
}
