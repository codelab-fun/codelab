import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { MonacoConfigService } from '@codelab/code-demos/src/lib/shared/monaco-config.service';
import { editor, IDisposable } from 'monaco-editor';
import ITextModel = editor.ITextModel;
import { CodeDemoEditorInjector } from '@codelab/code-demos/src/lib/code-demo-editor/code-demo-editor.injector';

@Component({
  selector: 'code-demo-editor-from-model',
  templateUrl: './editor-from-model.component.html',
  styleUrls: ['./editor-from-model.component.css'],
  providers: [CodeDemoEditorInjector]
})
export class EditorFromModelComponent implements AfterViewInit, OnDestroy {
  @ViewChild('editor', { static: true }) el;
  fontSize = 14;
  editor: any;
  height = 0;
  private didChangeListener: IDisposable;
  private model: ITextModel;

  constructor(
    private editorInjector: CodeDemoEditorInjector,
    readonly monacoConfigService: MonacoConfigService
  ) {}

  @Input('model') set setModel(model: ITextModel) {
    this.model = model;
    if (this.editor) {
      this.editor.setModel(model);
    }
  }

  setUpEditor(el: HTMLElement) {
    return this.monacoConfigService.monaco.editor.create(el, {
      wrappingColumn: 10,
      model: this.model,
      scrollBeyondLastLine: false,
      tabCompletion: true,
      wordBasedSuggestions: true,
      lineNumbersMinChars: 3,
      cursorBlinking: 'phase',
      renderIndentGuides: false,
      lineNumbers: false,
      automaticLayout: true,
      fontSize: this.fontSize,
      minimap: {
        enabled: false
      }
    });
  }

  resize() {
    const lines = this.editor
      .getModel()
      .getValue()
      .split('\n').length;
    const lineHeight = this.fontSize * 1.6;
    const height = Math.max(lines * lineHeight, lineHeight * 5);

    if (this.height !== height) {
      this.height = height;
      this.el.nativeElement.style.height = height + 'px';
      // Needed for firefox
      this.el.nativeElement.parentElement.style.height = height + 'px';
      this.editor.layout();
    }
  }

  ngAfterViewInit() {
    this.editor = this.editorInjector.editor = this.setUpEditor(
      this.el.nativeElement
    );

    this.resize();
    this.didChangeListener = this.editor.onDidChangeModelContent(() =>
      this.resize()
    );
  }

  ngOnDestroy() {
    this.editor.dispose();
    if (this.didChangeListener) {
      this.didChangeListener.dispose();
      this.didChangeListener = null;
    }
  }
}
