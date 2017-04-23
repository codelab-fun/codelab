import { FileConfig } from './../interfaces/file-config';
import { Component, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-code-editor',
  template: `
    <app-editor [file]="file" [fontSize]="fontSize" [app-focus-highlight-match]="highlight" [ng-tooltips]="ngTooltips"></app-editor>
    <div #code [style.display]="'none'"><ng-content></ng-content></div>
  `,
})
export class CodeEditorComponent {
  @Input('type') type = 'typescript';
  @Input('fontSize') fontSize = 30;
  @Input('code') code = '';

  @Input('tooltips') ngTooltips = [];
  @Input('focus-highlight-match') highlight = [];
  @ViewChild('code') codeElement: ElementRef;

  file: FileConfig;

  ngOnInit() {
    this.file = {
      code: this.codeElement.nativeElement.innerText.trim() || this.code,
      readonly: true,
      path: ''+Math.random(),
      type: this.type,
      template: ''
    }
  }
}
