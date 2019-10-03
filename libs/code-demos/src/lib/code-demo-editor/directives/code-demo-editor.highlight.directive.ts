import {
  AfterViewInit,
  Directive,
  Input,
  OnChanges,
  Optional,
  Self
} from '@angular/core';
import { findPosition } from '../utils/utils';
import { CodeDemoEditorInjector } from '@codelab/code-demos/src/lib/code-demo-editor/code-demo-editor.injector';
import { MonacoConfigService } from '@codelab/code-demos/src/lib/shared/monaco-config.service';

@Directive({
  selector: '[codeDemoHighlight]'
})
export class CodeDemoEditorHighlightDirective
  implements OnChanges, AfterViewInit {
  decorators = [];
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
      if (!this.codeDemoHighlight) {
        return;
      }

      if (!Array.isArray(this.codeDemoHighlight)) {
        this.codeDemoHighlight = [this.codeDemoHighlight];
      }

      if (!editor.getModel()) {
        return;
      }
      const code = editor.getModel().getValue();

      if (!code.length) {
        return;
      }

      const decorations = this.codeDemoHighlight
        .map(match =>
          typeof match !== 'string' && match.match ? match : { match }
        )
        .reduce((ranges, { match, className }) => {
          const { indexStart, lineStart, indexEnd, lineEnd } = findPosition(
            code,
            match
          );
          ranges.push({
            range: new this.monacoConfigService.monaco.Range(
              lineStart,
              indexStart,
              lineEnd,
              indexEnd
            ),
            options: { inlineClassName: className || 'highlighted-code' }
          });

          return ranges;
        }, []);

      this.decorators = editor.deltaDecorations(this.decorators, []);
      this.decorators = editor.deltaDecorations(this.decorators, decorations);
    }
  }

  ngOnChanges() {
    this.highlight();
  }
}
