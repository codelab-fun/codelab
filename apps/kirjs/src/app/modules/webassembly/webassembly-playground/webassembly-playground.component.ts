import { Component, Input, OnInit } from '@angular/core';

@Component({

  selector: 'kirjs-webassembly-playground',
  templateUrl: './webassembly-playground.component.html',
  styleUrls: ['./webassembly-playground.component.css']
})
export class WebassemblyPlaygroundComponent implements OnInit {
  @Input() webAssemblyCode = `(module
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    local.get $lhs
    local.get $rhs
    i32.add)
  (export "add" (func $add))
)`;
  jsCode = `
async function run(code) {
  const result = await WebAssembly.instantiate(code);
  return result.instance.exports.add(1, 2);
}
  `;
  constructor() { }

  ngOnInit() {
  }

}
