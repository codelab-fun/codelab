import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';


interface Files {
  [key: string]: string;
}

@Component({
  selector: 'slides-simple-angular-editor',
  template: `
    <div vertical-split *ngIf="code">
      <div>
        <div style="display: flex;">
          <mat-form-field *ngIf="showFilePicker" style="margin-left: 20px;">
            <mat-select [(ngModel)]="file">
              <mat-option *ngFor="let fileName of files" [value]="fileName">{{fileName}}</mat-option>
            </mat-select>
          </mat-form-field>
          <button mat-button *ngIf="solutions[file] && solutions[file] != code[file]" style="cursor: pointer"
                  (click)="code[file]=solutions[file]">Load
            solution
          </button>
        </div>
        <slides-simple-editor
          (ngModelChange)="update()"
          language="typescript"
          style="height: 400px;"
          [lineNumbers]="false"
          [fontSize]="20"
          [(ngModel)]="code[file]">
        </slides-simple-editor>
      </div>
      <slides-simple-angular-runner style="height: 400px;display: block;margin-bottom: 50px;"
                                    [code]=code></slides-simple-angular-runner>
    </div>
  `,
  styleUrls: ['editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SimpleAngularEditorComponent),
      multi: true
    }
  ],
})
export class SimpleAngularEditorComponent implements ControlValueAccessor {
  @Input() file: string;
  @Input() code: Files;
  @Input() solutions: Files = {};

  change = new Subject();
  showFilePicker = true;
  files: string[] = [];
  private onChange: (code: Files) => void;

  constructor() {
    this.change.pipe(debounceTime(1000)).subscribe(() => {
      this.code = {...this.code};
      this.onChange(this.code);
    })
  }

  registerOnChange(onChange: (code: Files) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched() {
  }

  writeValue(code: Files): void {
    if (code) {
      this.code = code;
      this.files = Object.keys(this.code);
    }
  }

  update() {
    this.change.next();
  }

}

