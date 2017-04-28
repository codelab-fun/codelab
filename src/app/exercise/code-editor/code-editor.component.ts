import {FileConfig} from './../interfaces/file-config';
import {Component, ContentChild, Input} from '@angular/core';

@Component({
  selector: 'app-code-editor',
  template: `
    <app-editor [file]="file" [fontSize]="fontSize" [app-focus-highlight-match]="highlight"
                [ng-tooltips]="ngTooltips"></app-editor>
  `,
})
export class CodeEditorComponent {
  @Input('type') type = 'typescript';
  @Input() fontSize = 30;
  @Input() readonly = true;
  @Input('code') code = '';
  @Input('tooltips') ngTooltips = [];
  @Input('focus-highlight-match') highlight = [];
  @ContentChild('code') textarea;
  file: FileConfig;

  constructor() {
  }

  ngOnInit() {
    const code = this.textarea && this.textarea.nativeElement.value.trim() || this.code;
    if(this.highlight[0] && !(this.highlight[0] instanceof RegExp) ){
      // Has to be a regex
      debugger
    }
    if (!code) {
      throw new Error(`No code was provided for the app-code-editor component.
      
      Ether pass it to the code property:
      <app-code-editor [code]="code"></app-code-editor>
      
      Or use a textarea with #code:
      <app-code-editor><textarea #code>
        Your code goes here!!!
      </textarea></app-code-editor>`);
    }

    this.file = {
      code: code,
      readonly: this.readonly,
      path: 'hi' + Math.random(),
      type: this.type,
      template: ''
    }
  }

  ngAfterViewInit() {

  }
}
