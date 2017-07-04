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
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publish';
import { FileConfig } from '../interfaces/file-config';
import { MonacoConfigService } from '../services/monaco-config.service';
import { PresentationComponent } from '../../presentation/presentation/presentation.component';
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
  private actialFontSize = 12;
  @ViewChild('editor') editorContent: ElementRef;
  @Output() onCodeChange = new EventEmitter();
  private editSub: Subject<String> = new Subject<String>();
  autorun: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  height = 0;
  public code = '';

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


  constructor(public monacoConfigService: MonacoConfigService, public presentation: PresentationComponent) {
    this.editSubscription = this.editSub.publish(A => this.autorun.switchMap(a => a ? A.debounceTime(1000) : A))
      .subscribe(this.onCodeChange);
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
    if (!this.code) {
      // tslint:disable-next-line:no-debugger
      debugger;
    }

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
        lineNumbers: 'off'
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

