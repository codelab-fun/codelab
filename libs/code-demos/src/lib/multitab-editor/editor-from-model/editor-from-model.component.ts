import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy,
  HostListener,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { MonacoConfigService } from '@codelab/code-demos/src/lib/shared/monaco-config.service';
import { editor, IDisposable } from 'monaco-editor';
import ITextModel = editor.ITextModel;
import { CodeDemoEditorInjector } from '@codelab/code-demos/src/lib/code-demo-editor/code-demo-editor.injector';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { generateMonacoEditorConfig } from './editor-from-model.config';

@Component({
  selector: 'code-demo-editor-from-model',
  templateUrl: './editor-from-model.component.html',
  styleUrls: ['./editor-from-model.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CodeDemoEditorInjector]
})
export class EditorFromModelComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editor') el;

  fontSize = 14;
  editor: any;
  height = 0;
  private didChangeListener: IDisposable;
  private model: ITextModel;
  onContextMenu$: IDisposable;

  stateChanged$ = new Subject();

  constructor(
    private editorInjector: CodeDemoEditorInjector,
    readonly monacoConfigService: MonacoConfigService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  @Input('model') set setModel(model: ITextModel) {
    this.model = model;
    if (this.editor) {
      this.editor.setModel(model);
    }
  }

  private setUpEditor(el: HTMLElement) {
    return this.monacoConfigService.monaco.editor.create(
      el, generateMonacoEditorConfig({
        model: this.model,
        lineNumbers: true,
        contextmenu: true
      })
    );
  }

  private resize() {

  }

  ngOnInit() {
    // this.stateChanged$.pipe(
    //   debounceTime(50)
    // ).subscribe(() => {
    //   // console.log('stuff');
    //   // this.resize();
    // });
  }

  ngAfterViewInit() {
    this.editor = this.editorInjector.editor = this.setUpEditor(
      this.el.nativeElement
    );

    this.onContextMenu$ = this.editor.onContextMenu(e => {
      this.updateContextMenuElementPosition(e);
    });

    this.didChangeListener = this.editor.onDidChangeModelContent(() => {
      this.changeDetectorRef.markForCheck();
      this.editor.layout();
    });
  }

  /**
   * We need to correct the position of the context menu
   * when it becomes visible to fixed position due to it
   * expanding its container height when there is not enough
   * space. Desired behavior is for it just 'float' on
   * top of the container context.
   *
   * This is a known bug. {@see https://github.com/Microsoft/monaco-editor/issues/1203}
   *
   * @todo fix properly when issue is fixed in library.
   */
  updateContextMenuElementPosition({ event }) {
    const menuEl = this.editor.getDomNode().querySelector('.monaco-menu-container') as HTMLElement;

    if (menuEl) {
      const posY = (event.posy + menuEl.clientHeight) > window.outerHeight
        ? event.posy - menuEl.clientHeight
        : event.posy;

      const posX = (event.posx + menuEl.clientWidth) > window.outerWidth
        ? event.posx - menuEl.clientWidth
        : event.posx;

      menuEl.style.position = 'fixed';
      menuEl.style.top =  Math.max(0, Math.floor(posY)) + 'px';
      menuEl.style.left = Math.max(0, Math.floor(posX)) + 'px';
    }
  }

  ngOnDestroy() {
    this.editor.dispose();
    if (this.didChangeListener) {
      this.didChangeListener.dispose();
      this.didChangeListener = null;
    }

    if (this.onContextMenu$) {
      this.onContextMenu$.dispose();
      this.onContextMenu$ = null;
    }

    this.stateChanged$.unsubscribe();
  }
}
