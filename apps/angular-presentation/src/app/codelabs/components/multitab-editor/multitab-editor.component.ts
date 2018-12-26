import { Component, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { editor, IDisposable } from 'monaco-editor';
import { MonacoConfigService } from '../../../../../../../libs/exercise/src/lib/services/monaco-config.service';
import ITextModel = editor.ITextModel;
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

declare const monaco;
const extenstionToLang = {
  ts: 'typescript',
  js: 'javascript',
  html: 'html'
};

@Component({
  selector: 'slides-multitab-editor',
  templateUrl: './multitab-editor.component.html',
  styleUrls: ['./multitab-editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultitabEditorComponent),
      multi: true
    }
  ]
})
export class MultitabEditorComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() code: any = {};
  @Input() solutions: any = {};
  @Input() file;
  @Input() showPanel = true;
  @Input() slidesSimpleHighlightMatch = [];

  @ViewChild('editor') editorEl;
  private onChange: any;
  private files: string[];
  private editor: IStandaloneCodeEditor;
  private models: ITextModel[];
  private didChangeListener: IDisposable;

  constructor(readonly monacoConfigService: MonacoConfigService) {
  }

  get language() {
    return extenstionToLang[this.file.match(/\.(\w+)$/)[1]];
  }

  ngOnInit() {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  update(code: string) {
    this.code[this.file] = code;
    this.onChange({...this.code});
  }

  loadSolution(file) {
    this.getModelByFileName(file).setValue(this.solutions[file]);
  }

  getModelByFileName(file): ITextModel {
    return this.models.find(
      m => m.uri.toString().replace('file:///', '') === file
    );
  }

  displayEditor() {
    const editor = this.editorEl.nativeElement;

    this.dispose();

    this.models = Object.entries(this.code).map(([path, code]) => {
      const language = extenstionToLang[path.match(/\.(\w+)$/)[1]];
      return this.monacoConfigService.monaco.editor.createModel(
        code,
        language,
        'file:///' + path
      );
    });

    // this.models.forEach((model) => {
    //   model.setEOL(1);
    // });

    this.editor = this.monacoConfigService.monaco.editor.create(editor, {
      wrappingColumn: 10,
      model: this.models[0],
      scrollBeyondLastLine: false,
      tabCompletion: true,
      wordBasedSuggestions: true,
      lineNumbersMinChars: 3,
      cursorBlinking: 'phase',
      renderIndentGuides: false,
      lineNumbers: false,
      automaticLayout: true,
      fontSize: 20,
      // folding: true,
      minimap: {
        enabled: false
      }
    });

    this.didChangeListener = this.editor.onDidChangeModelContent(() => {
      this.update(this.editor.getModel().getValue())
    })
  }

  writeValue(code: any): void {
    if (code) {
      this.code = code;
      this.displayEditor();
      this.files = Object.keys(this.code);
    }
  }

  ngOnDestroy() {
    this.dispose();
  }

  openFile(file) {
    this.file = file;
    const m = this.getModelByFileName(file) as any;
    this.editor.setModel(m);
    m.setValue(m.getValue());
  }

  private dispose() {
    if (this.models) {
      this.models.forEach(model => {
        model.dispose();
      });
      this.models = null;
    }

    if (this.didChangeListener) {
      this.didChangeListener.dispose();
      this.didChangeListener = null;
    }

    if (this.editor) {
      this.editor.dispose();
      this.editor = null;
    }
  }
}
