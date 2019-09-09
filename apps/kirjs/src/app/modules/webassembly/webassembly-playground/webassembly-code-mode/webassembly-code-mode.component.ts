import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

declare const require;

@Component({
  selector: 'slides-webassembly-code-mode',
  templateUrl: './webassembly-code-mode.component.html',
  styleUrls: ['./webassembly-code-mode.component.css']
})
export class WebassemblyCodeModeComponent implements OnInit, OnChanges {
  @Input() code: any;
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

  constructor() {
  }

  @Input() set selection(selection: string) {
    selection = selection || '';
    const matchFunc = /\s*func\s+\$(\w+)\s/;
    const m = selection.match(matchFunc);
    if (m && m[1]) {
      if (this.modes[m[1]]) {
        this.state = {
          type: 'selection',
          mode: m[1]
        };
      } else {
        this.state = {
          type: 'options',
          mode: m[1],
          options: Object.keys(this.modes).toString()
        };

      }
    } else {
      this.state = {
        type: 'empty'
      };

    }
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

  selectMode(mode: string) {
    this.mode = mode;
    this.wasmSelectionHighlight.emit('');
    this.state = {};
    this.updateCode();
  }

  ngOnInit() {
  }

}
