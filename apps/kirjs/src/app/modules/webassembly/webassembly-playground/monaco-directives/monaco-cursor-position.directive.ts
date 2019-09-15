import { AfterViewInit, Directive, EventEmitter, Optional, Output, Self } from '@angular/core';
import { CodeDemoEditorInjector } from '@codelab/code-demos/src/lib/code-demo-editor/code-demo-editor.injector';

@Directive({
  selector: '[slidesMonacoCursorPosition]'
})
export class MonacoCursorPositionDirective implements AfterViewInit {
  @Output() slidesMonacoCursorPosition = new EventEmitter();
  lastName: string;

  constructor(
    @Self() @Optional() private editorInjector: CodeDemoEditorInjector,
  ) {


  }

  ngAfterViewInit() {
    const editor = this.editorInjector.editor;
    editor.onDidChangeCursorPosition(({position}) => {
      const model = editor.getModel();
      const textBefore = model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      });


      const lastIndex = textBefore.lastIndexOf('func');
      if (lastIndex === -1) {
        return;
      }
      const text = textBefore.slice(lastIndex);
      const matchFunc = /\s*func\s+\$(\w+)\s/;
      const m = text.match(matchFunc);

      if (!m || !m[1]) {
        return;
      }
      const name = m[1];
      if (name !== this.lastName) {
        this.slidesMonacoCursorPosition.emit(name);
      }
    });
  }
}
