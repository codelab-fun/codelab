import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

declare const require;

@Component({
  selector: 'slides-webassembly-code-mode',
  templateUrl: './webassembly-code-mode.component.html',
  styleUrls: ['./webassembly-code-mode.component.css']
})
export class WebassemblyCodeModeComponent implements OnInit, OnChanges {
  @Input() code: any;
  @Input() selectedMode = {};
  @Output() wasmSelectionHighlight = new EventEmitter();
  readonly modes = {
    'default': true,
    'get': true,
    'getIndex': true
  };
  wat: string;
  js: string;
  mode = 'getIndex';
  state: any;
  selectedFunction: string;

  constructor() {
  }

  @Input() set selectedWasmFunction(name: string) {
    this.selectedFunction = name;

  }

  updateCode() {
    if (this.code) {
      this.wat = this.code.wat;
      this.js = this.code.js;
    }
  }

  ngOnChanges() {
    if (this.code) {
      this.updateCode();
    }
  }

  ngOnInit() {
  }

}
