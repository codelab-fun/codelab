import { Component, OnInit } from '@angular/core';
import './monaco-wat';
import { getIndexTests } from './tests/get-index-tests';
import { rotateTests } from './tests/rotate-tests';
import { webAssemblyTestHandler } from './webassembly-playground/runners/wasm-test-runner/wasm-test-runner.component';
import { shiftTests } from './tests/shift-tests';
import { calcNextStateTests } from './tests/next-state-tests';
import { getCellScoreTests } from './tests/get-cell-score';

declare const require;


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
    func: {
      add1: {
        description: 'Takes X and Y coordinate and returns index in the memory.',
        handler: webAssemblyTestHandler,
        tests: getIndexTests,
      },
      getIndex: {
        description: 'Takes X and Y coordinate and returns index in the memory.',
        handler: webAssemblyTestHandler,
        tests: getIndexTests,
      },
      rotate: {
        description: 'Takes an index, and rotates it to be within the range of the line',
        handler: webAssemblyTestHandler,
        tests: rotateTests,
      },
      shift: {
        description: 'TBD',
        handler: webAssemblyTestHandler,
        tests: shiftTests,
      },
      calcNextState: {
        description: 'calcNextState',
        handler: webAssemblyTestHandler,
        tests: calcNextStateTests,
      },
      getCellScore: {
        description: 'Looks for 3 cells before, and gets a number 0-7',
        handler: webAssemblyTestHandler,
        tests: getCellScoreTests,
      }
    },
  };

  constructor() {
  }

  ngOnInit() {
  }
}
