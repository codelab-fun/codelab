import { AfterViewInit, Directive, Input, OnChanges } from '@angular/core';
import { SimpleEditorComponent } from './simple-editor.component';
import { findPosition } from '../../../../tooltips/src/lib/utils';

@Directive({
  selector: '[slidesSimpleHighlightMatch]'
})
export class SimpleHighlightMatchDirective implements OnChanges, AfterViewInit {

  decorators = [];
  @Input() slidesSimpleHighlightMatch;
  @Input() ngModel;

  constructor(private readonly editorComponent: SimpleEditorComponent) {
  }

  ngAfterViewInit() {
    this.highlight();
    window.setTimeout(() => {
      this.highlight()
    }, 1000);
  }

  highlight() {

    if (this.editorComponent.editor) {
      if (!this.slidesSimpleHighlightMatch) {
        return;
      }

      if (!Array.isArray(this.slidesSimpleHighlightMatch)) {
        this.slidesSimpleHighlightMatch = [this.slidesSimpleHighlightMatch];
      }

      const code = this.editorComponent.model.getValue();

      if (!code.length) {
        return;
      }


      const decorations = this.slidesSimpleHighlightMatch.reduce((ranges, {match, className}) => {
        const {indexStart, lineStart, indexEnd, lineEnd} = findPosition(code, match);
        ranges.push({
          range: new this.editorComponent.monacoConfigService.monaco.Range(lineStart, indexStart, lineEnd, indexEnd),
          options: {inlineClassName: className || 'highlighted-code'}
        });

        return ranges;
      }, []);

      this.decorators = this.editorComponent.editor.deltaDecorations(this.decorators, []);
      // this.decorators = this.editorComponent.editor.deltaDecorations(this.decorators, decorations);
    }
  }

  ngOnChanges() {
    this.highlight();
  }

}
