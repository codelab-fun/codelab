import { FileConfig } from './../interfaces/file-config';
import { Component, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-editor-inline',
  template: `
    <app-editor [file]="file" [fontSize]="fontSize" [ng-tooltips]="ngTooltips"></app-editor>
    <div #code [style.display]="'none'"><ng-content></ng-content></div>
  `,
})
export class EditorInlineComponent {
  @Input('type') type = 'typescript';
  @Input('fontSize') fontSize = 45;

  /** TODO: Tooltips in this case, don't work as expected */
  @Input('tooltips') ngTooltips;

  @ViewChild('code') code: ElementRef;

  file: FileConfig;

  ngOnInit() {
    this.file = {
      code: this.code.nativeElement.innerHTML,
      readonly: true,
      path: '',
      type: this.type,
      template: ''
    }
  }
}
