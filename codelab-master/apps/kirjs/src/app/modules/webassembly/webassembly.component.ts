import { Component, OnInit } from '@angular/core';
import './monaco-wat';
import { getIndex } from './tests/get-index';
import { rotate } from './tests/rotate';
import { shiftTests } from './tests/shift-tests';
import { getCellScoreTests } from './tests/get-cell-score';
import { addTests } from './tests/add-tests';
import { loadCellTests } from './tests/load-cell';
import { loadPreviousCellTests } from './tests/load-previous-cell';
import { storeCellTests } from './tests/store-cell-tests';
import { evolveCellTests } from './tests/evolve-cell';
import { enableTests } from './tests/enable-tests';
import { disableTests } from './tests/disable-tests';
import { evolveRowTests } from './tests/evolve-row';
import { evolveTests } from './tests/evolve';
import { extractAnswers } from './utils';
import { Level } from '../stack/stack-game/stack-game.component';

declare const require;

export const wasmAnswers = extractAnswers(
  require('!!raw-loader!./samples/answer.wat')
);

function generateArray(size = 89, callback) {
  const result = Array.from(new Array(size)).map((a, i) => 0);
  return (callback || (a => a))(result);
}

function inPlace(rule) {
  const map = (256 + rule)
    .toString(2)
    .substr(1)
    .split('')
    .map(Number)
    .reduce((a, v, i) => {
      a[(15 - i).toString(2).substr(1)] = v;
      return a;
    }, {});

  function transformRow(row) {
    const result = [];
    for (let i = 0; i < row.length; i++) {
      const a1 = row[(row.length + i - 1) % row.length].toString();
      const a2 = row[i].toString();
      const a3 = row[(i + 1) % row.length].toString();
      result[i] = [map[a1 + a2 + a3]];
    }
    return result;
  }

  return function(grid) {
    return grid.map(transformRow);
  };
}

function transform2d(rule) {
  const survive = rule.survive.reduce((a, v) => {
    a[v] = true;
    return a;
  }, {});
  const born = rule.born.reduce((a, v) => {
    a[v] = true;
    return a;
  }, {});

  return function(grid) {
    return grid.map((row, y) => {
      return row.map((cell, x) => {
        const px = (row.length + x - 1) % row.length;
        const nx = (x + 1) % row.length;
        const py = (grid.length + y - 1) % grid.length;
        const ny = (y + 1) % grid.length;

        const score =
          grid[py][px] +
          grid[py][x] +
          grid[py][nx] +
          grid[y][px] +
          grid[y][nx] +
          grid[ny][px] +
          grid[ny][x] +
          grid[ny][nx];

        if ((cell === 0 && born[score]) || (cell === 1 && survive[score])) {
          return 1;
        }

        return 0;
      });
    });
  };
}

function appendTransform(rule) {
  const transform = inPlace(rule);
  return function(grid) {
    const lastRow = grid[grid.length - 1];
    grid.push(transform([lastRow])[0]);
    return grid;
  };
}

const rand = Math.floor(Math.random() * 255);

const randomRules = new Array(8).fill(0).reduce(
  (a, v, i) => {
    if (Math.random() < 0.3) {
      a.survive.push(i);
    }
    if (Math.random() < 0.3) {
      a.born.push(i);
    }
    return a;
  },
  { survive: [], born: [] }
);

const gameOfLifeRules = { survive: [2, 3], born: [3] };
const gameOfLife = transform2d(gameOfLifeRules);
const randomPattern = new Array(30)
  .fill(0)
  .map(() => new Array(60).fill(0).map(() => (Math.random() < 0.3 ? 1 : 0)));
const randomPatternSparce = new Array(30)
  .fill(0)
  .map(() => new Array(60).fill(0).map(() => (Math.random() < 0.04 ? 1 : 0)));

const labyrynthRules = { survive: [0, 1, 2, 3], born: [1] };

const labRules4 = { survive: [0, 1, 2, 3, 4], born: [1] };
const labRules5 = { survive: [0, 1, 2, 3, 4, 5], born: [1] };
const labRules6 = { survive: [0, 1, 2, 3, 4, 5, 6], born: [1] };

@Component({
  selector: 'kirjs-webassembly',
  templateUrl: './webassembly.component.html',
  styleUrls: ['./webassembly.component.scss']
})
export class WebassemblyComponent implements OnInit {
  patterns = {
    rule90Start: generateArray(89, a => {
      a[44] = 1;
      return a;
    })
  };

  fontSize = 30;
  examples = {
    wat: `(func $add
    (param $x i32)
    (param $y i32)
    (result i32)
  local.get $x
  local.get $y
  i32.add
)`,
    intro: {
      inverse(pattern) {
        return pattern.map(line => line.map(cell => (cell + 1) % 2));
      },
      rand,
      inPlace16: inPlace(16),
      inPlace90: inPlace(90),
      twoD18: appendTransform(18),
      twoD30: appendTransform(30),
      twoD90: appendTransform(90),
      twoD110: appendTransform(110),
      twoDRand: appendTransform(rand),

      pattern: [
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0]
      ]
    },
    life: {
      randomRules,
      random: transform2d(randomRules),
      gameOfLifeRules,
      gameOfLife,
      labyrynthRules: labyrynthRules,
      labyrynth: transform2d(labyrynthRules),
      labRules4,
      labyrynth4: transform2d(labRules4),
      labRules5,
      labyrynth5: transform2d(labRules5),
      labRules6,
      labyrynth6: transform2d(labRules6),
      pattern: {
        randomPattern,
        randomPatternSparce,
        stillLife: [
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0]
        ]
      }
    }
  };

  code = {
    add: {
      wat: `(module
    (func $add
        (param $x i32)
        (param $y i32)
        (result i32)


    )
)
`,
      js: require('!!raw-loader!./samples/base.js')
    },
    simple: {
      wat: require('!!raw-loader!./samples/base.wat'),
      js: require('!!raw-loader!./samples/base.js')
    },
    brIf: {
      wa: `(module
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    (local $l1 i32)
      i32.const 33
      set_local $l1

      block $lol
        i32.const 1
        i32.const 1
        i32.eq
        br_if $lol
        i32.const 22
        set_local $l1
      end
      get_local $l1
    )
  (export "add" (func $add))
)
`
    }
  };

  itIsALemon = false;

  addModeConfig = {
    wat: {
      func: {
        add: {
          description: 'Takes two numbers and adds them together',
          tests: addTests
        }
      }
    }
  };
  modeConfig = {
    wat: {
      elem: {
        default: {}
      },
      module: {
        default: {
          milestones: [
            { type: 'func', name: 'rotate' },
            { type: 'global.rowSize', name: 'rowSize' },
            { type: 'func', name: 'getIndex' },
            { type: 'global.step', name: 'step' },
            { type: 'memory', name: 'memory' },
            { type: 'func', name: 'loadCell' },
            { type: 'func', name: 'storeCell' },
            { type: 'func', name: 'shift' },
            { type: 'func', name: 'loadPreviousCell' },
            { type: 'func', name: 'getCellScore' },
            { type: 'table', name: 'table' },
            { type: 'elem', name: 'elem' },
            { type: 'func', name: 'evolveCell' },
            { type: 'func', name: 'evolveRow' },
            { type: 'func', name: 'evolve' }
          ]
        }
      },
      func: {
        add: {
          description: 'Takes two numbers and adds them together',
          tests: addTests
        },
        rotate: {
          description:
            'Takes an index, and rotates it to be within the range of the line',
          tests: rotate
        },
        getIndex: {
          description:
            'Takes X and Y coordinate and returns index in the memory.',
          tests: getIndex
        },
        loadCell: {
          description:
            'Takes a position, calculates appropriate index and retrieves the data from memory',
          tests: loadCellTests
        },
        storeCell: {
          description: 'Stores single cell value im the memory',
          tests: storeCellTests
        },
        shift: {
          description:
            'Takes 3 0|1 value and generates 3 bit number merging them together',
          tests: shiftTests
        },
        loadPreviousCell: {
          description: 'Loads previous cell',
          tests: loadPreviousCellTests
        },
        getCellScore: {
          description: 'Looks for 3 cells before, and gets a number 0-7',
          tests: getCellScoreTests
        },
        evolveCell: {
          description:
            'Evolves single cell based on values of the previous cells',
          tests: evolveCellTests
        },
        evolveRow: {
          description:
            'Evolves the whole row based on valueds of the previous row',
          tests: evolveRowTests
        },
        evolve: {
          description: 'Evolves the whole thing N generations',
          tests: evolveTests
        },

        enable: {
          description: 'This should always return 1',
          tests: enableTests
        },
        disable: {
          description: 'This should always return 0',
          tests: disableTests
        }
      }
    },
    ts: {
      SourceFile: {
        default: {}
      },
      FunctionDeclaration: {
        default: {}
      }
    }
  };

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
