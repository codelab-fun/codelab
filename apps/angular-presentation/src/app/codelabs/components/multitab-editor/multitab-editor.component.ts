import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'slides-multitab-editor',
  templateUrl: './multitab-editor.component.html',
  styleUrls: ['./multitab-editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultitabEditorComponent),
      multi: true
    }
  ],
})
export class MultitabEditorComponent implements OnInit, ControlValueAccessor {
  @Input() code: any;
  @Input() solutions: any = {};
  @Input() file;
  @Input() slidesSimpleHighlightMatch = [];

  private onChange: any;
  private files: string[];

  constructor() {
  }

  ngOnInit() {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  update(code: string) {
    this.code[this.file] = code;
    this.onChange({...this.code});
  }

  writeValue(code: any): void {
    if (code) {
      this.code = code;
      this.files = Object.keys(this.code);
    }
  }
}
