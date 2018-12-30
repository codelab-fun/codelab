import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';

import { MonacoConfigService } from '../../../../../../../../libs/exercise/src/lib/services/monaco-config.service';
import { editor, IDisposable } from 'monaco-editor';
import ITextModel = editor.ITextModel;

@Component({
  selector: 'slides-editor-from-model',
  templateUrl: './editor-from-model.component.html',
  styleUrls: ['./editor-from-model.component.css']
})
export class EditorFromModelComponent implements AfterViewInit, OnDestroy {
  @ViewChild('editor') el;
  editor: any;
  private didChangeListener: IDisposable;
  private model: ITextModel;

  constructor(readonly monacoConfigService: MonacoConfigService) {
  }

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
      fontSize: 14,
      minimap: {
        enabled: false
      }
    });

  }

  ngAfterViewInit() {
    this.editor = this.setUpEditor(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.didChangeListener) {
      this.didChangeListener.dispose();
      this.didChangeListener = null;
    }
  }
}
