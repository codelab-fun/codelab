import { Component, ContentChild, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FileConfig } from '../interfaces/file-config';
import { MonacoConfigService } from '../services/monaco-config.service';
import { CodeGroupComponent } from '../code-group/code-group.component';
import { EditorComponent } from '../editor/editor.component';
import { SlideComponent } from '@slides/slides/src/slide/slide.component';

declare const require;


@Component({
  selector: 'slides-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {
  @Input() type = 'typescript';
  @Input() fontSize = 30;
  @Input() readonly = true;
  @Input() code = '';
  @Input() path?;
  @Input() minLines = 6;
  @Input() lineNumbers = 'off';

  // tslint:disable-next-line:all TODO: Fix linter warnings on the next line and delete this comment.
  @Input('tooltips') slidesTooltips: any[] = [];
  // tslint:disable-next-line:all TODO: Fix linter warnings on the next line and delete this comment.
  @Input('focus-highlight-match') highlight: any[] = [];
  @ViewChild(EditorComponent) public editor;
  @ContentChild('code') textarea;
  public file: FileConfig;


  constructor(public slide: SlideComponent,
              private monacoConfig: MonacoConfigService, @Optional()
              private group: CodeGroupComponent) {
  }

  @Input('babelHighlightMatch') babelHighlightMatch: any


  ngOnInit(): void {
    const code = this.textarea && this.textarea.nativeElement.value.trim() || this.code;

    if (this.highlight[0] && !(this.highlight[0] instanceof RegExp)) {
      // Has to be a regex
      // tslint:disable-next-line:no-debugger TODO: Remove debugger
      debugger;
    }

    if (code === undefined) {
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
      path: this.path || 'hi' + Math.random(),
      type: this.type,
      template: ''
    };

    if (this.group) {
      this.group.register(this);
    }


    if (!this.group) {
      MonacoConfigService.monacoReady.then(() => {
        this.monacoConfig.createFileModels([this.file]);
      });

    }
  }
}
