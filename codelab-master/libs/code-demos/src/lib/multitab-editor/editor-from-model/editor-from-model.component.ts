import {
  AfterViewInit,
  Component,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import { MonacoConfigService } from '@codelab/code-demos/src/lib/shared/monaco-config.service';
import { editor, IDisposable } from 'monaco-editor';
import { CodeDemoEditorInjector } from '@codelab/code-demos/src/lib/code-demo-editor/code-demo-editor.injector';
import { MatSnackBar } from '@angular/material/snack-bar';
import ITextModel = editor.ITextModel;

@Component({
  selector: 'code-demo-editor-from-model',
  templateUrl: './editor-from-model.component.html',
  styleUrls: ['./editor-from-model.component.css'],
  providers: [CodeDemoEditorInjector, MatSnackBar]
})
export class EditorFromModelComponent
  implements AfterViewInit, OnChanges, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('model') setModel: ITextModel;
  @ViewChild('editor', { static: false }) el;
  @Input() autoSize = true;
  fontSize = 14;
  editor: any;
  height = 0;
  private didChangeListener: IDisposable;
  private model: ITextModel;

  constructor(
    private zone: NgZone,
    private editorInjector: CodeDemoEditorInjector,
    readonly monacoConfigService: MonacoConfigService,
    private snackBar: MatSnackBar
  ) {}

  resize() {
    if (!this.autoSize) {
      return;
    }

    const lines = this.editor.getModel().getLineCount();
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
    this.editor = this.editorInjector.editor = this.monacoConfigService.createEditor(
      this.el.nativeElement,
      {
        model: this.model,
        fontSize: this.fontSize
      }
    );

    this.editor.addAction({
      id: 'saveAction',
      label: 'Save Shortcut Press',
      keybindings: [
        this.monacoConfigService.monaco.KeyMod.chord(
          this.monacoConfigService.monaco.KeyMod.CtrlCmd |
            this.monacoConfigService.monaco.KeyCode.KEY_S
        )
      ],
      run: () => {
        this.zone.run(() => {
          this.snackBar.open('Saved', '', {
            duration: 2000
          });
        });
      }
    });

    this.resize();

    this.didChangeListener = this.editor.onDidChangeModelContent(() => {
      this.zone.run(() => {
        this.resize();
      });
    });
  }

  ngOnDestroy() {
    this.editor.dispose();

    if (this.didChangeListener) {
      this.didChangeListener.dispose();
      this.didChangeListener = null;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('setModel' in changes) {
      this.model = this.setModel;
      if (this.editor) {
        this.editor.setModel(this.setModel);
      }
    }
  }
}
