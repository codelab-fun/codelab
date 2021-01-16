import { Directive, Input, OnChanges, Optional, Self } from '@angular/core';
import { CodeDemoEditorInjector } from '@codelab/code-demos/src/lib/code-demo-editor/code-demo-editor.injector';
import { findPosition } from '@codelab/code-demos/src/lib/code-demo-editor/utils/utils';

@Directive({
  selector: '[slidesMonacoScrolling]'
})
export class MonacoScrollingDirective implements OnChanges {
  @Input() slidesMonacoScrolling = '';
  lastValue: string;

  constructor(
    @Self() @Optional() private editorInjector: CodeDemoEditorInjector
  ) {}

  ngOnChanges(changes) {
    const editor = this.editorInjector.editor;
    if (
      editor &&
      changes.slidesMonacoScrolling &&
      changes.slidesMonacoScrolling.currentValue !== this.lastValue
    ) {
      this.lastValue = this.slidesMonacoScrolling;

      if (this.slidesMonacoScrolling) {
        const range = findPosition(
          editor.getModel().getValue(),
          this.slidesMonacoScrolling
        );

        // This does not really work
        editor.revealRangeInCenter({
          startColumn: range.indexStart,
          endColumn: range.indexEnd,
          startLineNumber: range.lineStart,
          endLineNumber: range.lineEnd
        });
      }
    }
  }
}
