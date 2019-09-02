import { Component, OnInit } from '@angular/core';
import './monaco-wat';

@Component({
  selector: 'kirjs-webassembly',
  templateUrl: './webassembly.component.html',
  styleUrls: ['./webassembly.component.css']
})
export class WebassemblyComponent implements OnInit {

  code = {
    simple: {
      wa: `(module
  (func $result (result i32)
    i32.const 42
  )
  (export "add" (func $result))
)`
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

  constructor() {
  }

  ngOnInit() {
  }

}
