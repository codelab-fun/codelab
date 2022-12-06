import {
  AfterViewInit,
  Directive,
  Input,
  OnChanges,
  Optional,
  Self,
} from '@angular/core';
import { findPosition } from '../utils/utils';
import { CodeDemoEditorInjector } from '@codelab/code-demos/src/lib/code-demo-editor/code-demo-editor.injector';
import { MonacoConfigService } from '@codelab/code-demos/src/lib/shared/monaco-config.service';
import { editor } from 'monaco-editor';
import IEditorDecorationsCollection = editor.IEditorDecorationsCollection;
import { rangeToDecoration } from '../../../../../../apps/codelab/src/app/admin/content/presentation-editor/wrappers/custom-component-editors/codelab-code-demo-console-editor/highlight-button/highlight-button.component';

@Directive({
  selector: '[codeDemoHighlight]',
})
export class CodeDemoEditorHighlightDirective
  implements OnChanges, AfterViewInit
{
  readonly decorators = [];
  private decorationsCollection?: IEditorDecorationsCollection;
  @Input() codeDemoHighlight;
  @Input() ngModel;

  constructor(
    @Self() @Optional() private editorInjector: CodeDemoEditorInjector,
    readonly monacoConfigService: MonacoConfigService
  ) {}

  ngAfterViewInit() {
    this.highlight();
    // TODO(kirjs): Get rid of the timeout
    window.setTimeout(() => {
      this.highlight();
    }, 1000);
  }

  highlight() {
    if (!this.editorInjector) {
      return;
    }

    const editor = this.editorInjector.editor;

    if (editor) {
      if (!this.codeDemoHighlight || !editor.getModel()) {
        return;
      }

      if (!this.decorationsCollection) {
        this.decorationsCollection = editor.createDecorationsCollection();
      }

      if (!Array.isArray(this.codeDemoHighlight)) {
        this.codeDemoHighlight = [this.codeDemoHighlight];
      }

      const code = editor.getModel().getValue();

      if (!code.length) {
        return;
      }

      if (!this.codeDemoHighlight.length) {
        return;
      }

      if ('startColumn' in this.codeDemoHighlight[0]) {
        this.decorationsCollection.set(
          this.codeDemoHighlight.map(rangeToDecoration)
        );
      } else {
        const decorations = this.codeDemoHighlight
          .map((match) =>
            typeof match !== 'string' && match.match ? match : { match }
          )
          .reduce((ranges, { match, className }) => {
            let range: [number, number, number, number];
            if (match.endColumn) {
              range = [
                match.selectionStartLineNumber,
                match.selectionStartColumn,
                match.endLineNumber,
                match.endColumn,
              ];
            } else {
              const position = findPosition(code, match);

              const { indexStart, lineStart, indexEnd, lineEnd } = position;
              range = [lineStart, indexStart, lineEnd, indexEnd];
            }

            ranges.push({
              range: new this.monacoConfigService.monaco.Range(...range),
              options: { inlineClassName: className || 'highlighted-code' },
            });

            return ranges;
          }, []);

        this.decorationsCollection.set(decorations);
      }
    }
  }

  ngOnChanges() {
    console.log('Changes', this.codeDemoHighlight);
    this.highlight();
  }
}
