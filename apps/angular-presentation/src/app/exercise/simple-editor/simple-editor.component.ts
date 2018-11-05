import {
  AfterViewInit,
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MonacoConfigService } from '../services/monaco-config.service';
import * as theme from './themes/devtools.json';

declare const monaco: any;
declare const require: any;

@Component({
  selector: 'slides-simple-editor',
  template: `
    <div #editor class="monaco-editor"></div>`,
  styleUrls: ['editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SimpleEditorComponent),
      multi: true
    }
  ],
})
export class SimpleEditorComponent implements ControlValueAccessor, AfterViewInit, OnChanges {
  height: number;
  minLines = 6;
  actialFontSize: number;
  model: any;
  editor: any;
  @Input() fontSize = 12;
  @Input() language = 'html';
  @Input() lineNumbers = true;
  @Output() change = new EventEmitter();
  @Output() lineChange = new EventEmitter();
  @ViewChild('editor') editorEl;
  code: string;

  constructor(readonly monacoConfigService: MonacoConfigService) {
  }


  registerOnTouched(fn: any): void {
  }

  registerOnChange(onChange: (code: string) => void): void {
    this.change.subscribe(onChange)
  }

  writeValue(value: string): void {
    if (value === null) {
      return;
    }
    this.code = value;
    if (this.model) {
      this.model.setValue(value);
    }
  }

  @HostListener('window:resize')
  resize() {
    if (this.editor) {
      this.editor.updateOptions({fontSize: this.fontSize * document.documentElement.clientWidth / 1800});
      const lines = this.code.split('\n').length;
      const lineHeight = this.actialFontSize * 1.6;
      const height = Math.max(lines * lineHeight, lineHeight * this.minLines);

      if (this.height !== height) {
        this.height = height;
        this.editorEl.nativeElement.style.height = height + 'px';
        this.editor.layout();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fontSize) {
      this.resize();
    }
  }

  onLineChange() {
    const lineNumber = this.editor.getPosition().lineNumber;

    this.lineChange.emit({
      lineNumber,
      line: this.model.getLineContent(lineNumber),
      value: this.model.getValue()
    });
  }


  ngAfterViewInit(): void {
    const editor = this.editorEl.nativeElement;
    this.model = this.monacoConfigService.monaco.editor.createModel(this.code, this.language);
    this.monacoConfigService.monaco.editor.defineTheme('OneDark', theme);

    this.monacoConfigService.monaco.editor.setTheme('OneDark');

    this.editor = this.monacoConfigService.monaco.editor.create(editor,
      {
        wrappingColumn: 10,
        model: this.model,
        scrollBeyondLastLine: false,
        tabCompletion: true,
        wordBasedSuggestions: true,
        lineNumbersMinChars: 3,
        cursorBlinking: 'phase',
        renderIndentGuides: false,
        lineNumbers: this.lineNumbers,
        automaticLayout: true,
        fontSize: this.fontSize,
        // folding: true,
        minimap: {
          enabled: false
        }
      });

    this.editor.onDidChangeCursorPosition(() => {
      this.onLineChange();
    });

    this.model.onDidChangeContent(() => {
      this.change.emit(this.editor.getModel().getValue());
    });


    this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      () => this.change.emit(this.editor.getModel().getValue()));


  }
}

