import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface WebassemblyPlaygroundInputs {
  wat: string;
  js: string;
}

@Component({
  selector: 'kirjs-webassembly-playground',
  templateUrl: './webassembly-playground.component.html',
  styleUrls: ['./webassembly-playground.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WebassemblyPlaygroundComponent),
      multi: true
    }
  ]
})
export class WebassemblyPlaygroundComponent
  implements OnInit, ControlValueAccessor {
  code: WebassemblyPlaygroundInputs;
  private onChange: (code: WebassemblyPlaygroundInputs) => void;

  constructor() {}

  ngOnInit() {}

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

  update() {
    this.onChange(this.code);
  }
}
