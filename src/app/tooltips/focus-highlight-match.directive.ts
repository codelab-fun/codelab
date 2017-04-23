import {Directive, Input} from '@angular/core';
import {EditorComponent} from '../exercise/editor/editor.component';
import {findPosition} from './utils';

@Directive({
  selector: '[app-focus-highlight-match]'
})
export class FocusHighlightDirective {
  @Input('app-focus-highlight-match') matches: Array<string> = [];

  constructor(private editorComponent: EditorComponent) {
  }

  ngAfterViewInit() {
    this.editorComponent.slide.onActive.filter(a => a).first().subscribe(() => {
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


      this.editorComponent._editor.deltaDecorations([], decorations);
    })
  }


}
