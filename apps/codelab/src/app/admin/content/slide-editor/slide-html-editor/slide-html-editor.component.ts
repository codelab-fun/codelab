import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import MediumEditor from 'medium-editor';
import { AsideButton } from './aside-button';

@Component({
  selector: 'slides-slide-html-editor',
  templateUrl: './slide-html-editor.component.html',
  styleUrls: [
    './slide-html-editor.component.css',
    '../../../../shared/slide-styles.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideHtmlEditorComponent
  implements AfterViewInit, OnChanges, OnDestroy {
  @Input() html;
  @Output() changeHtml = new EventEmitter();
  private editor: any;
  code = '';

  constructor(private readonly el: ElementRef) {}

  ngAfterViewInit(): void {
    this.editor = new MediumEditor(this.el.nativeElement, {
      toolbar: {
        buttons: ['bold', 'aside', 'unorderedlist', 'removeFormat']
      },
      extensions: {
        highlighter: new AsideButton()
      }
    });
    this.editor.setContent(this.html);
    this.editor.subscribe('editableInput', (_, element) => {
      this.code = element.innerHTML;
      this.changeHtml.emit(element.innerHTML);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editor) {
      if (this.code !== this.html) {
        this.editor.setContent(this.html);
      }
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
