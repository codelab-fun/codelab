import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

declare const require;

@Component({
  selector: 'slides-webassembly-code-mode',
  templateUrl: './webassembly-code-mode.component.html',
  styleUrls: ['./webassembly-code-mode.component.css']
})
export class WebassemblyCodeModeComponent implements OnChanges {
  @HostBinding('style.width.px') width = 0;
  @Input() code: any;
  @Input() sideBarBlocks: any[];
  @Output() wasmSelectionHighlight = new EventEmitter();
  @Output() loadAnswer = new EventEmitter<any>();

  wat: string;
  js: string;
  mode = 'getIndex';
  state: any;
  selectedMode = {};
  private blocks: any[];

  constructor() {}

  updateCode() {
    if (this.code) {
      this.wat = this.code.wat;
      this.js = this.code.js;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('sideBarBlocks' in changes) {
      this.blocks = this.sideBarBlocks || [];
      const block = this.blocks.find(b => !!b.meta);
      this.selectedMode = {};
      if (block) {
        this.selectedMode = block.meta;
      }
      this.width = Object.keys(this.selectedMode).length > 0 ? 400 : 0;
    }

    if (this.code) {
      this.updateCode();
    }
  }

  loadAnswerFromConfig(selectedMode: any) {
    this.loadAnswer.emit(selectedMode);
  }
}
