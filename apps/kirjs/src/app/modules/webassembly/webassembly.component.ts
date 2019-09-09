import { Component, OnInit } from '@angular/core';
import './monaco-wat';
import { extractFunction, extractGlobals, generateWatTestCode } from './utils';
import { getIndexTests } from './samples/get-index/get-index-tests';
import { rotateTests } from './samples/rotate/rotate-tests';

declare const require;

interface TestConfig {
  name: string;
}

interface WebAssemblyTestConfig extends TestConfig {
  highlights: string[];
  mode: string;
  globals: string[];
  code: {
    wat: string;
    js: string;
  };
}

function webAssemblyTestHandler(config: TestConfig, code: string): WebAssemblyTestConfig {
  const funcCode = extractFunction('getIndex', code);
  const globals = extractGlobals(funcCode);
  const wat = generateWatTestCode({globals, code: funcCode, name: config.name});
  return {
    code: {
      wat,
      js: require('!!raw-loader!./samples/get-index/get-index.js'),
    },
    globals,
    ...config,
    mode: 'test',
    highlights: funcCode
  };
}

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
    'getIndex': {
      description: 'Takes X and Y coordinate and returns index in the memory.',
      handler: webAssemblyTestHandler,
      tests: getIndexTests,
    },
    'rotate': {
      description: 'Takes an index, and rotates it to be within the range of the line',
      handler: webAssemblyTestHandler,
      tests: rotateTests,
    }
  };

  constructor() {
  }

  ngOnInit() {
  }
}
