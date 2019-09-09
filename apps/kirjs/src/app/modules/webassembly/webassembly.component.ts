import { Component, OnInit } from '@angular/core';
import './monaco-wat';
import { extractFunction, wasmAddContent } from './utils';
import { getIndexTests } from './samples/get-index/get-index-tests';
import { rotateTests } from './samples/rotate/rotate-tests';

declare const require;

@Component({
  selector: 'kirjs-webassembly',
  templateUrl: './webassembly.component.html',
  styleUrls: ['./webassembly.component.css']
})
export class WebassemblyComponent implements OnInit {
  simpleCode;
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
      getHighlights: (code) => {
        return extractFunction('getIndex', code);
      },
      mode: 'test',
      tests: getIndexTests,
      processCode: (code) => {
        const functionCode = extractFunction('getIndex', code);
        console.log(wasmAddContent(functionCode, require('!!raw-loader!./samples/get-index/get-index.wat')));
        return {
          wat: wasmAddContent(functionCode, require('!!raw-loader!./samples/get-index/get-index.wat')),
          js: require('!!raw-loader!./samples/get-index/get-index.js')
        };
      },
    },
    'rotate': {
      description: 'Takes an index, and rotates it to be within the range of the line',
      getHighlights: (code) => {
        return extractFunction('rotate', code);
      },
      mode: 'test',
      tests: rotateTests,
      processCode: (code) => {
        const functionCode = extractFunction('rotate', code);
        return {
          wat: wasmAddContent(functionCode, require('!!raw-loader!./samples/rotate/rotate.wat')),
          js: require('!!raw-loader!./samples/get-index/get-index.js')
        };
      },
    }
  };

  constructor() {
  }

  ngOnInit() {
  }
}
