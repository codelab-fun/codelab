import {Component, ContentChild, Input, OnInit} from '@angular/core';
import {FileConfig} from '../interfaces/file-config';

@Component({
  selector: 'slides-code-editor',
  template: `
    <slides-editor [file]="file" [fontSize]="fontSize" [slides-focus-highlight-match]="highlight"
                [ng-tooltips]="ngTooltips"></slides-editor>
  `,
})
export class CodeEditorComponent implements OnInit {
  @Input('type') type = 'typescript';
  @Input() fontSize = 30;
  @Input() readonly = true;
  @Input('code') code = '';
  // tslint:disable-next-line:all TODO: Fix linter warnings on the next line and delete this comment.
  @Input('tooltips') ngTooltips: any[] = [];
  // tslint:disable-next-line:all TODO: Fix linter warnings on the next line and delete this comment.
  @Input('focus-highlight-match') highlight: any[] = [];
  @ContentChild('code') textarea;
  file: FileConfig;

  constructor() {
  }

  ngOnInit(): void {
    const code = this.textarea && this.textarea.nativeElement.value.trim() || this.code;
    if (this.highlight[0] && !(this.highlight[0] instanceof RegExp) ) {
      // Has to be a regex
      // tslint:disable-next-line:no-debugger TODO: Remove debugger
      debugger;
    }
    if (!code) {
      throw new Error(`No code was provided for the slides-code-editor component.

      Ether pass it to the code property:
      <slides-code-editor [code]="code"></slides-code-editor>

      Or use a textarea with #code:
      <slides-code-editor><textarea #code>
        Your code goes here!!!
      </textarea></slides-code-editor>`);
    }

    this.file = {
      code: code,
      readonly: this.readonly,
      path: 'hi' + Math.random(),
      type: this.type,
      template: ''
    };
  }

}
