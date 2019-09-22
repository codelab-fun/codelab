import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Optional,
  Output,
  Self
} from '@angular/core';
import { CodeDemoEditorInjector } from '@codelab/code-demos/src/lib/code-demo-editor/code-demo-editor.injector';
import { extractBlocks, populateBlocks, serializeBlocks } from '../../utils';
import { CodePath } from './common';

@Directive({
  selector: '[slidesMonacoWatPosition]'
})
export class MonacoWatPositionDirective implements AfterViewInit {
  @Output() slidesMonacoWatPosition = new EventEmitter<CodePath>();
  lastResult: string;

  constructor(
    @Self() @Optional() private editorInjector: CodeDemoEditorInjector
  ) {}

  ngAfterViewInit() {
    const editor = this.editorInjector.editor;
    editor.onDidChangeCursorPosition(x => {
      const position = x.position;
      const model = editor.getModel();
      const offset = model.getOffsetAt(position);
      const value = model.getValue();

      const textBefore = value.slice(0, offset + 1);
      const textAfter = value.slice(offset);

      const blocks = populateBlocks(extractBlocks(textBefore, textAfter));

      const result = serializeBlocks(blocks);
      // If we're in the same path and value is the same, let's not update

      const key = result + value;
      if (this.lastResult !== key) {
        this.lastResult = key;
        this.slidesMonacoWatPosition.emit({ type: 'wat', blocks });
      }
    });
  }
}
