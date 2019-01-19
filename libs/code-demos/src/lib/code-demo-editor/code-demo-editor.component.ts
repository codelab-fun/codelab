import {
  AfterViewInit,
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MonacoConfigService } from '../../../../exercise/src/lib/services/monaco-config.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';

declare const monaco: any;
declare const require: any;

@Component({
  selector: 'code-demo-editor',
  template: `
    <div #editor class="monaco-editor"></div>
  `,
  styleUrls: ['editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeDemoEditorComponent),
      multi: true
    }
  ]
})
export class CodeDemoEditorComponent
  implements ControlValueAccessor, AfterViewInit, OnChanges, OnDestroy {
  height: number;
  @Input() minLines = 6;
  model: any;
  editor: any;
  @Input() debounce = 1;
  @Input() fontSize = 20;
  @Input() language = 'typescript';
  @Input() theme = '';
  @Input() lineNumbers = true;
  @Input() autoSize = true;
  changeSubject = new Subject();

  @Output() change = new EventEmitter();
  @Output() lineChange = new EventEmitter();
  @ViewChild('editor') editorEl;
  code: string;
  private subscription: Subscription;

  constructor(readonly monacoConfigService: MonacoConfigService) {
    this.subscription = this.changeSubject
      .pipe(debounceTime(this.debounce))
      .subscribe(a => this.change.emit(a));
  }

  registerOnTouched(fn: any): void {}

  registerOnChange(onChange: (code: string) => void): void {
    this.change.subscribe(onChange);
  }

  writeValue(value: string): void {
    if (value === null) {
      return;
    }
    this.code = value;
    this.resize();
    if (this.model) {
      this.model.setValue(value);
    }
  }

  @HostListener('window:resize')
  resize() {
    if (this.editor && this.code) {
      const actualFontSize =
        (this.fontSize * document.documentElement.clientWidth) / 1800;
      this.editor.updateOptions({ fontSize: actualFontSize });
      const lines = this.code.split('\n').length;
      const lineHeight = actualFontSize * 1.6;
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
    this.model = this.monacoConfigService.monaco.editor.createModel(
      this.code,
      this.language
    );

    if (this.theme) {
      this.monacoConfigService.monaco.editor.setTheme(this.theme);
    }

    this.editor = this.monacoConfigService.monaco.editor.create(editor, {
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
      this.changeSubject.next(this.editor.getModel().getValue());
    });

    this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () =>
      this.changeSubject.next(this.editor.getModel().getValue())
    );

    this.resize();
  }

  ngOnDestroy() {
    this.model.dispose();
    this.editor.dispose();
    this.subscription.unsubscribe();
  }
}
