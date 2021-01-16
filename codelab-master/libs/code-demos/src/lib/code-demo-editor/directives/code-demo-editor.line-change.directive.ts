import {
  AfterViewInit,
  Directive,
  EventEmitter,
  OnDestroy,
  Output,
  Self,
  NgZone
} from '@angular/core';
import { CodeDemoEditorInjector } from '../code-demo-editor.injector';
import { IDisposable } from 'monaco-editor';

interface LineChangeContext {
  lineNumber: number;
  line: string;
  value: string;
}

@Directive({
  selector: '[codeDemoLineChange]'
})
export class CodeDemoEditorLineChangeDirective
  implements AfterViewInit, OnDestroy {
  @Output() codeDemoLineChange: EventEmitter<
    LineChangeContext
  > = new EventEmitter();

  private subscription: IDisposable;

  constructor(
    private zone: NgZone,
    @Self() private editorInjector: CodeDemoEditorInjector
  ) {}

  ngAfterViewInit(): void {
    this.editorInjector.editor.onDidChangeCursorPosition(() => {
      this.zone.run(() => {
        this.onLineChange();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.dispose();
      this.subscription = null;
    }
  }

  private onLineChange() {
    const editor = this.editorInjector.editor;

    const lineNumber = editor.getPosition().lineNumber;

    const model = editor.getModel();
    this.codeDemoLineChange.emit({
      lineNumber,
      line: model.getLineContent(lineNumber),
      value: model.getValue()
    });
  }
}
