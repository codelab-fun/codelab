import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CodeHelperBlock, CodePath, getCodeBlockHandler } from './monaco-directives/common';

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
export class WebassemblyPlaygroundComponent
  implements ControlValueAccessor {
  @Input() modeConfig = {};
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

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(code: WebassemblyPlaygroundInputs): void {
    this.code = code;
  }

  selectFunction(path: CodePath) {
    this.sideBarBlocks = path.blocks.map(b => {
      const langConfig = this.modeConfig[path.type];
      if (!langConfig) {
        return {...b};
      }


      let meta = langConfig[b.type];
      if (meta && meta[b.name]) {
        meta = meta[b.name];
        meta.name = b.name;

        const handler = meta.handler || getCodeBlockHandler(path.type, b.type) || (a => a);
        meta = handler(meta, b.code);
      }

      return {...b, meta};
    });
  }

  update() {
    this.code = {...this.code};
    this.onChange(this.code);
  }
}
