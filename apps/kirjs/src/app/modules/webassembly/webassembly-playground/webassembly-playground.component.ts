import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CodeHelperWebAssemblyBlock } from '../utils';

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
  private onChange: (code: WebassemblyPlaygroundInputs) => void;
  private selectedBlocks: CodeHelperWebAssemblyBlock[] = [];
  private sideBarBlocks: { code: string; before: string; meta: any; name?: string; after: string; type: string }[];

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

  updateMode() {
    this.sideBarBlocks = this.selectedBlocks.map(b => {
      let meta = this.modeConfig[b.type];
      if (meta && meta[b.name]) {
        meta = meta[b.name];
        meta.name = b.name;
        meta = meta.handler(meta, b.code);
      }

      return {...b, meta};
    });


  }

  selectFunction(selectedBlocks: CodeHelperWebAssemblyBlock[]) {
    this.selectedBlocks = selectedBlocks;
    this.updateMode();
  }

  update() {
    this.code = {...this.code};
    this.onChange(this.code);
  }
}
