import { Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output } from '@angular/core';

declare const require;

@Component({
  selector: 'slides-webassembly-code-mode',
  templateUrl: './webassembly-code-mode.component.html',
  styleUrls: ['./webassembly-code-mode.component.css']
})
export class WebassemblyCodeModeComponent implements OnInit, OnChanges {
  @HostBinding('style.width.px') width = 0;
  @Input() code: any;
  @Output() wasmSelectionHighlight = new EventEmitter();
  @Output() loadAnswer = new EventEmitter<any>();
  wat: string;
  js: string;
  mode = 'getIndex';
  state: any;
  private blocks: any[];
  private selectedMode = {};

  constructor() {
  }

  @Input() set sideBarBlocks(blocks) {
    this.blocks = blocks || [];
    const block = this.blocks.find(b => !!b.meta);
    this.selectedMode = {};
    if (block) {
      this.selectedMode = block.meta;
    }
    this.width = Object.keys(this.selectedMode).length > 0 ? 400 : 0;
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

  loadAnswerFromConfig(selectedMode: any) {
    this.loadAnswer.emit(selectedMode);
  }
}
