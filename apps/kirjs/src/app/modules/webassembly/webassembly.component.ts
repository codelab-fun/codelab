import { Component, OnInit } from '@angular/core';
import './monaco-wat';
import { getIndex } from './tests/get-index';
import { rotate } from './tests/rotate';
import { shiftTests } from './tests/shift-tests';
import { calcNextStateTests } from './tests/next-state-tests';
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

declare const require;

export const wasmAnswers = extractAnswers(require('!!raw-loader!./samples/answer.wat'));

@Component({
  selector: 'kirjs-webassembly',
  templateUrl: './webassembly.component.html',
  styleUrls: ['./webassembly.component.css']
})
export class WebassemblyComponent implements OnInit {
  code = {
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


  modeConfig = {
    wat: {
      func: {
        add: {
          description: 'Takes two numbers and adds them together',
          tests: addTests,
        },
        loadCell: {
          description: 'Load cell',
          tests: loadCellTests,
        },
        getIndex: {
          description: 'Takes X and Y coordinate and returns index in the memory.',
          tests: getIndex,
        },
        enable: {
          description: 'This should always return 1',
          tests: enableTests,
        },
        disable: {
          description: 'This should always return 0',
          tests: disableTests,
        },
        rotate: {
          description: 'Takes an index, and rotates it to be within the range of the line',
          tests: rotate,
        },
        shift: {
          description: 'TBD',
          tests: shiftTests,
        },
        storeCell: {
          description: 'Stores single cell value im the memory',
          tests: storeCellTests,
        },
        evolveCell: {
          description: 'Evolves single cell based on values of the previous cells',
          tests: evolveCellTests,
        },
        evolve: {
          description: 'Evolves the whole thing N generations',
          tests: evolveTests,

        },
        evolveRow: {
          description: 'Evolves the whole row based on valueds of the previous row',
          tests: evolveRowTests,
        },
        loadPreviousCell: {
          description: 'Loads previous cell',
          tests: loadPreviousCellTests,
        },
        calcNextState: {
          description: 'calcNextState',
          tests: calcNextStateTests,
        },
        getCellScore: {
          description: 'Looks for 3 cells before, and gets a number 0-7',
          tests: getCellScoreTests,
        }
      },
    },
    ts: {
      FunctionDeclaration: {
        drawOnCanvas: {
          description: 'Draws on canvas',
          tests: []
        }
      }
    }
  };

  constructor() {
  }

  ngOnInit() {
  }
}
