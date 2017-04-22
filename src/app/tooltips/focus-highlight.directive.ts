import {Directive, Input} from '@angular/core';
import {EditorComponent} from '../exercise/editor/editor.component';
import {findPosition} from './utils';

@Directive({
  selector: '[app-focus-highlight]'
})
export class FocusHighlightDirective {
  @Input('app-focus-highlight') tooltips: Array<string> = [];

  constructor(private editorComponent: EditorComponent) {
  }

  ngAfterViewInit() {
    this.editorComponent.slide.onActive.filter(a => a).first().subscribe(() => {
      const decorations = this.tooltips.reduce((ranges, match) => {
        const {indexStart, lineStart, indexEnd, lineEnd} = findPosition(this.editorComponent.code, match);
        ranges.push(new this.editorComponent.monacoConfigService.monaco.Range(1, 1, lineStart, indexStart));
        ranges.push(new this.editorComponent.monacoConfigService.monaco.Range(lineEnd, indexEnd, 10000, 10000));
        return ranges;

      }, []).map(range => ({
        range, options: {
          inlineClassName: 'grayed-out-code'
        }
      }));


      this.editorComponent._editor.deltaDecorations([], decorations);
    })
  }


}
