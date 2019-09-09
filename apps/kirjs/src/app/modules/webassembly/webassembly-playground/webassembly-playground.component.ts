import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  private selectedWasmFunction: string;

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
    const name = this.selectedWasmFunction;
    let config: any = {name: name || ''};


    if (this.modeConfig[name] && this.code.wat) {
      config = {
        ...config,
        ...this.modeConfig[name]
      };
      config = config.handler({...config, name}, this.code.wat);
    }

    this.selectedMode = config;
  }

  selectFunction(name: string) {
    this.selectedWasmFunction = name;
    this.updateMode();

  }

  update() {
    this.code = {...this.code};
    this.updateMode();
    this.onChange(this.code);
  }
}
