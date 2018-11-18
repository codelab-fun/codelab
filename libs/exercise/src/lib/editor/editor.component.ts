import {
  AfterViewInit,
  Component,
  ElementRef,
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

import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { FileConfig } from '../interfaces/file-config';
import { MonacoConfigService } from '../services/monaco-config.service';
import { assert } from '../services/utils';
import { debounceTime, publish, switchMap } from 'rxjs/operators';

declare const monaco: any;
declare const require: any;


@Component({
  selector: 'slides-editor',
  template: `
    <div #editor class="monaco-editor"></div>`,
  styleUrls: ['editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true
    }
  ],
})
export class EditorComponent implements AfterViewInit, OnChanges, OnDestroy {
  editSubscription: Subscription;
  public editor: any;
  @Input() public file: FileConfig;
  @Input() fontSize = 12;
  @Input() minLines = 6;
  @Input() lineNumbers = 'off';
  @ViewChild('editor') editorContent: ElementRef;
  @Output() onCodeChange = new EventEmitter();
  autorun: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  height = 0;
  public code = '';
  private actialFontSize = 12;
  private editSub: Subject<String> = new Subject<String>();

  constructor(public monacoConfigService: MonacoConfigService) {
    this.editSubscription = this.editSub.pipe(publish(A => this.autorun.pipe(switchMap(a => a ? A.pipe(debounceTime(1500)) : A))))
      .subscribe(this.onCodeChange);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.fontSize && this.editor) {
      this.resize();
    }
    if (changes.file && changes.file.currentValue.code !== this.code) {
      this.loadCode(changes.file.currentValue.code);
    }
  }

  calcHeight(lines): number {
    const lineHeight = this.actialFontSize * 1.6;
    return Math.max(lines * lineHeight, lineHeight * this.minLines);
  }

  loadCode(code: string) {
    this.code = code;
    if (this.editor) {
      this.editor.getModel().setValue(code);
      this.updateHeight(code);
    }
  }

  @HostListener('window:resize')
  resize() {
    this.calcActualFontSize();
    this.editor.updateOptions({fontSize: this.actialFontSize});
    this.updateHeight(this.code);
  }

  calcActualFontSize() {
    this.actialFontSize = this.fontSize * document.documentElement.clientWidth / 1800;
  }


  ngAfterViewInit(): void {
    // TODO: This will not work on resize
    this.calcActualFontSize();
    assert(this.code, 'Code is undefined for the editor');
    assert(this.fontSize, 'Incorrect font-size passed');

    const myDiv: HTMLDivElement = this.editorContent.nativeElement;
    const model = this.monacoConfigService.monaco.editor.getModel(this.file.path);

    this.code = this.file.code;
    this.editor = this.monacoConfigService.monaco.editor.create(myDiv,
      {
        model: model,
        scrollBeyondLastLine: true,
        readOnly: this.file.readonly,
        tabCompletion: true,
        wordBasedSuggestions: true,
        lineNumbersMinChars: 3,
        automaticLayout: true,
        fontSize: this.actialFontSize,
        lineNumbers: this.lineNumbers,
        folding: true,
      });

    this.editor.getModel().onDidChangeContent(() => {
      this.updateValue(this.editor.getModel().getValue());
    });


    // Re-running the code on Ctrl + Enter
    // TODO
    /* tslint:disable */
    this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      () => this.updateValue(this.editor.getModel().getValue()));
    /* tslint:enable */
    this.updateHeight(this.file.code);

  }

  updateHeight(value: string) {
    const height = this.calcHeight(value.split('\n').length);
    if (this.height !== height) {
      this.height = height;
      this.editorContent.nativeElement.style.height = height + 'px';
      this.editor.layout();
    }
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
    this.onCodeChange.unsubscribe();
    this.editSub.unsubscribe();
  }

  updateValue(value: string) {
    if (this.code !== value) {
      this.code = value;
      this.updateHeight(value);
      this.editSub.next(value);
    }
  }

  ping() {
    // TODO: Find a better way.
    const model = this.editor.getModel();
    const oldFullModelRange = model.getFullModelRange();
    const oldModelValueLength = model.getValueLengthInRange(oldFullModelRange);
    const endLineNumber = model.getLineCount();
    const endColumn = model.getLineMaxColumn(endLineNumber);
    model._emitContentChanged2(1, 1, endLineNumber, endColumn, oldModelValueLength, model.getValue(), false, false);
  }
}

