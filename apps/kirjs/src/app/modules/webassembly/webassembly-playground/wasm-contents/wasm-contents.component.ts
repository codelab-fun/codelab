import { Component, EventEmitter, Input, Output } from '@angular/core';

function genGlobal(name) {
  return {
    answer: `(module
  (import (global $${name} i32))
`,
    originalCode: /\(module/,
  };
}

function genMemory(name) {
  return {
    answer: `(module
  (memory 1)
  (export "memory" (memory 0))
`,
    originalCode: /\(module/,
  };
}

function genFuncName(name) {
  return {
    answer: `
  (func $${name} (result i32)

  )
)
`,
    originalCode: /\)\s*$/,
  };
}

@Component({
  selector: 'slides-wasm-contents',
  templateUrl: './wasm-contents.component.html',
  styleUrls: ['./wasm-contents.component.css']
})
export class WasmContentsComponent {
  @Input() config: any;
  @Output() loadAnswer = new EventEmitter<any>();


  loadFunction(m) {
    if (m.type === 'func') {
      this.loadAnswer.emit({
        ...genFuncName(m.name),
        ...m
      });
    }

    if (m.type === 'global') {
      this.loadAnswer.emit({
        ...genGlobal(m.name),
        ...m
      });
    }

    if (m.type === 'memory') {
      this.loadAnswer.emit({
        ...genMemory(m.name),
        ...m
      });
    }
  }
}
