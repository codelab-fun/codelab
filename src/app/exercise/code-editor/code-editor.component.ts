import {Component, ContentChild, Input, OnInit, Optional} from '@angular/core';
import {FileConfig} from '../interfaces/file-config';
import {MonacoConfigService} from '../services/monaco-config.service';
import {SlideComponent} from '../../presentation/slide/slide.component';
import {Subscription} from 'rxjs/Subscription';
import {CodeGroupComponent} from '../code-group/code-group.component';

@Component({
  selector: 'slides-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {
  onActiveUsubscribe: Subscription;
  @Input() type = 'typescript';
  @Input() fontSize = 30;
  @Input() readonly = true;
  @Input() code = '';
  @Input() path?;
  // tslint:disable-next-line:all TODO: Fix linter warnings on the next line and delete this comment.
  @Input('tooltips') ngTooltips: any[] = [];
  // tslint:disable-next-line:all TODO: Fix linter warnings on the next line and delete this comment.
  @Input('focus-highlight-match') highlight: any[] = [];
  @ContentChild('code') textarea;
  public file: FileConfig;
  public active = false;

  constructor(public slide: SlideComponent, private monacoConfig: MonacoConfigService, @Optional() group: CodeGroupComponent) {

    if (group) {
      group.register(this);
    }
    this.onActiveUsubscribe = slide.onActive.subscribe((active) => {
      if (active) {
        slide.disableResize();
        if (!group) {
          this.monacoConfig.createFileModels([this.file]);
          this.active = true;
        }
      } else {
        this.active = active;
      }
    });
  }

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
  }
}
