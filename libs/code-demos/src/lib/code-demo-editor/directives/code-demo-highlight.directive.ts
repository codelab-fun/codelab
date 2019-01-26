import {
  AfterViewInit,
  Directive,
  Host,
  Input,
  OnChanges,
  Optional
} from '@angular/core';
import { CodeDemoEditorComponent } from '../code-demo-editor.component';
import { findPosition } from '../utils/utils';
import { EditorFromModelComponent } from '../../multitab-editor/editor-from-model/editor-from-model.component';

@Directive({
  selector: '[codeDemoHighlight]'
})
export class CodeDemoHighlightDirective implements OnChanges, AfterViewInit {
  decorators = [];
  @Input() codeDemoHighlight;
  @Input() ngModel;
  private editorComponent: CodeDemoEditorComponent | EditorFromModelComponent;

  constructor(
    @Optional() @Host() editor1: CodeDemoEditorComponent,
    @Optional() @Host() editor2: EditorFromModelComponent
  ) {
    this.editorComponent = editor1 || editor2;
  }

  ngAfterViewInit() {
    this.highlight();
    // TODO(kirjs): Get rid of the timeout
    window.setTimeout(() => {
      this.highlight();
    }, 1000);
  }

  highlight() {
    if (!this.editorComponent) {
      return;
    }

    if (this.editorComponent.editor) {
      if (!this.codeDemoHighlight) {
        return;
      }

      if (!Array.isArray(this.codeDemoHighlight)) {
        this.codeDemoHighlight = [this.codeDemoHighlight];
      }

      if (!this.editorComponent.editor.getModel()) {
        return;
      }
      const code = this.editorComponent.editor.getModel().getValue();

      if (!code.length) {
        return;
      }

      const decorations = this.codeDemoHighlight
        .map(match => ({ match }))
        .reduce((ranges, { match, className }) => {
          const { indexStart, lineStart, indexEnd, lineEnd } = findPosition(
            code,
            match
          );
          ranges.push({
            range: new this.editorComponent.monacoConfigService.monaco.Range(
              lineStart,
              indexStart,
              lineEnd,
              indexEnd
            ),
            options: { inlineClassName: className || 'highlighted-code' }
          });

          return ranges;
        }, []);

      this.decorators = this.editorComponent.editor.deltaDecorations(
        this.decorators,
        []
      );
      this.decorators = this.editorComponent.editor.deltaDecorations(
        this.decorators,
        decorations
      );
    }
  }

  ngOnChanges() {
    this.highlight();
  }
}
