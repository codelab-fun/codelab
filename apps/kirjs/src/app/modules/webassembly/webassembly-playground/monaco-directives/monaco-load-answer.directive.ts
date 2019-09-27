import { Directive, EventEmitter, Optional, Output, Self } from '@angular/core';
import { CodeDemoEditorInjector } from '@codelab/code-demos/src/lib/code-demo-editor/code-demo-editor.injector';

@Directive({
  selector: '[slidesMonacoLoadAnswer]',
  exportAs: 'MonacoWatLoadAnswer'
})
export class MonacoWatLoadAnswerDirective {
  @Output() slidesMonacoLoadAnswer = new EventEmitter<void>();

  constructor(
    @Self() @Optional() private editorInjector: CodeDemoEditorInjector
  ) {}

  loadAnswer(config: any) {
    const model = this.editorInjector.editor.getModel();
    const value = model.getValue();
    const newValue = value.replace(config.originalCode, config.answer);
    model.setValue(newValue);
    this.slidesMonacoLoadAnswer.emit();
    const pos = model.getPositionAt(newValue.indexOf(config.answer) + 20);
    this.editorInjector.editor.setPosition(pos);
    this.editorInjector.editor.focus();
  }
}
