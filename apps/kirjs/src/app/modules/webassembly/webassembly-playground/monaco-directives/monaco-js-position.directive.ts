import { AfterViewInit, Directive, EventEmitter, Optional, Output, Self } from '@angular/core';
import { CodeDemoEditorInjector } from '@codelab/code-demos/src/lib/code-demo-editor/code-demo-editor.injector';

function getTypeScript() {
  if ((window as any).ts) {
    return (window as any).ts;
  }

  declare const requre;
  const ts = require('!!raw-loader!typescript');
  debugger;

  debugger;
}

@Directive({
  selector: '[slidesMonacoJsPosition]'
})
export class MonacoJsPositionDirective implements AfterViewInit {
  @Output() slidesMonacoCursorPosition = new EventEmitter();
  lastResult: string;

  constructor(
    @Self() @Optional() private editorInjector: CodeDemoEditorInjector,
  ) {
  }

  ngAfterViewInit() {
    const editor = this.editorInjector.editor;
    editor.onDidChangeCursorPosition((x) => {
      const model = editor.getModel();
      getTypeScript();
      debugger;
    });
  }
}
