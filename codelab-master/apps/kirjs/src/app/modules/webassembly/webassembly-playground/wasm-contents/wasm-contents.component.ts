import { Component, EventEmitter, Input, Output } from '@angular/core';

function genGlobalStep() {
  return {
    answer: `global $rowSize i32))
  (global $step (export "step") (mut i32) (i32.const 1))
`,
    originalCode: /global \$rowSize i32\)\)/
  };
}

function genMemory(name) {
  return {
    answer: `global $rowSize i32))
  (memory 1)
  (export "memory" (memory 0))
`,
    originalCode: /global \$rowSize i32\)\)/
  };
}

function genTable() {
  return {
    answer: `(memory 0))

  (table 8 anyfunc)
  (type $return_i32 (func (result i32)))
`,
    originalCode: /\(memory 0\)\)/
  };
}

function genElem() {
  return {
    answer: `(table 8 anyfunc)

  (func $enable (result i32)
    (i32.const 1)
  )

  (func $disable (result i32)
    (i32.const 0)
  )

  (elem (i32.const 0)
    $enable ;; 000
    $enable ;; 001
    $enable ;; 010
    $enable ;; 011
    $enable ;; 100
    $enable ;; 101
    $enable ;; 110
    $enable ;; 111
  )
`,
    originalCode: /\(table 8 anyfunc\)/
  };
}

function genRowSize() {
  return {
    answer: `(module
  (import "config" "rowSize" (global $rowSize i32))
`,
    originalCode: /\(module/
  };
}

function genModule() {
  return {
    answer: `(module

)
`,
    originalCode: /^/
  };
}

function genFuncName(name) {
  return {
    answer: `
  (func $${name} (result i32)

  )
)
`,
    originalCode: /\)\s*$/
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
    if (m.type === 'module') {
      this.loadAnswer.emit({
        ...genModule(),
        ...m
      });
    }

    if (m.type === 'global.step') {
      this.loadAnswer.emit({
        ...genGlobalStep(),
        ...m
      });
    }
    if (m.type === 'table') {
      this.loadAnswer.emit({
        ...genTable(),
        ...m
      });
    }
    if (m.type === 'elem') {
      this.loadAnswer.emit({
        ...genElem(),
        ...m
      });
    }
    if (m.type === 'global.rowSize') {
      this.loadAnswer.emit({
        ...genRowSize(),
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
