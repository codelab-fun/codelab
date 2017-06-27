import { AfterViewInit, Directive, Input } from '@angular/core';
import { EditorComponent } from '../exercise/editor/editor.component';
import { findPosition } from './utils';
import 'rxjs/add/operator/first';

@Directive({
  // tslint:disable-next-line:all TODO: Fix linter warnings on the selector and delete this comment.
  selector: '[slides-focus-highlight-match]'
})
export class FocusHighlightDirective implements AfterViewInit {
  // tslint:disable-next-line:all TODO: Fix linter warnings on the next line and delete this comment.
  @Input('slides-focus-highlight-match') matches: Array<string> | string = [];

  constructor(private editorComponent: EditorComponent) {
  }

  ngAfterViewInit(): void {

    if (!Array.isArray(this.matches)) {
      this.matches = [this.matches];
    }

    const decorations = this.matches.reduce((ranges, match) => {
      const {indexStart, lineStart, indexEnd, lineEnd} = findPosition(this.editorComponent.code, match);

      ranges.push({
        range: new this.editorComponent.monacoConfigService.monaco.Range(1, 1, lineStart, indexStart),
        options: {inlineClassName: 'grayed-out-code'}
      });

      ranges.push({
        range: new this.editorComponent.monacoConfigService.monaco.Range(lineEnd, indexEnd, 10000, 10000),
        options: {inlineClassName: 'grayed-out-code'}
      });

      ranges.push({
        range: new this.editorComponent.monacoConfigService.monaco.Range(lineStart, indexStart, lineEnd, indexEnd),
        options: {inlineClassName: 'highlighted-code'}
      });

      return ranges;
    }, []);


    this.editorComponent.editor.deltaDecorations([], decorations);
  }
}
