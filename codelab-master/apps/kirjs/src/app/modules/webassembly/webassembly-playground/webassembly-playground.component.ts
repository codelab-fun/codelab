import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  CodeHelperBlock,
  CodePath,
  getCodeBlockHandler
} from './monaco-directives/common';

interface WebassemblyPlaygroundInputs {
  wat: string;
  js: string;
}

@Component({
  selector: 'kirjs-webassembly-playground',
  templateUrl: './webassembly-playground.component.html',
  styleUrls: ['./webassembly-playground.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WebassemblyPlaygroundComponent),
      multi: true
    }
  ]
})
export class WebassemblyPlaygroundComponent implements ControlValueAccessor {
  @Input() modeConfig = {};
  @Input() fontSize = 30;
  code: WebassemblyPlaygroundInputs;
  wasmSelectionHighlight: string;
  selectedMode = {};
  sideBarBlocks: CodeHelperBlock[];
  private onChange: (code: WebassemblyPlaygroundInputs) => void;

  registerOnChange(
    onChange: (code: WebassemblyPlaygroundInputs) => void
  ): void {
    this.onChange = onChange;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}

  writeValue(code: WebassemblyPlaygroundInputs): void {
    this.code = code;
  }

  selectFunction(path: CodePath) {
    // Last block contains all the code of the module
    if (path.blocks.length === 0) {
      return;
    }

    const allCode = path.blocks[path.blocks.length - 1].code;
    this.sideBarBlocks = path.blocks.map(b => {
      const langConfig = this.modeConfig[path.type];

      if (!langConfig) {
        return { ...b };
      }

      let meta = langConfig[b.type];
      const name = b.name || 'default';
      if (meta && meta[name]) {
        meta = meta[name];
        meta.name = b.name;
        meta.type = b.type;
        const handler =
          meta.handler || getCodeBlockHandler(path.type, b.type) || (a => a);
        meta = handler(meta, b.code, allCode);
        meta.allCode = allCode;
      }

      return { ...b, meta };
    });

    const block = this.sideBarBlocks.find(b => !!b.meta);
    this.selectedMode = {};
    if (block) {
      // TODO(kirjs): Uncommit
      // this.selectedMode = block.meta;
    }
  }

  update() {
    this.code = { ...this.code };
    this.onChange(this.code);
  }
}
