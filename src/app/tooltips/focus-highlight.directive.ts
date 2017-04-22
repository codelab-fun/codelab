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
      this.tooltips.map((match, i) => {
        const {indexStart, lineNumber, indexEnd} = findPosition(this.editorComponent.code, match);
        debugger
        return {
          range: new this.editorComponent.monacoConfigService.monaco.Range(lineNumber, indexStart, lineNumber, indexEnd),
          options: {
            inlineClassName: 'tooltip-text-' + i
          }
        };
      });
    })
  }


}
