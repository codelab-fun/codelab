import { Directive, Input, OnChanges } from '@angular/core';
import { SimpleEditorComponent } from './simple-editor.component';
import { findPosition } from '../../../../../../libs/tooltips/src/lib/utils';

@Directive({
  selector: '[slidesSimpleHighlightMatch]'
})
export class SimpleHighlightMatchDirective implements OnChanges {

  decorators = [];
  @Input() slidesSimpleHighlightMatch;

  constructor(private readonly editorComponent: SimpleEditorComponent) {
  }

  ngOnChanges() {
    if (this.editorComponent.editor) {
      if (!this.slidesSimpleHighlightMatch) {
        return;
      }

      if (!Array.isArray(this.slidesSimpleHighlightMatch)) {
        this.slidesSimpleHighlightMatch = [this.slidesSimpleHighlightMatch];
      }

      const code = this.editorComponent.model.getValue();

      const decorations = this.slidesSimpleHighlightMatch.reduce((ranges, {match, className}) => {
        const {indexStart, lineStart, indexEnd, lineEnd} = findPosition(code, match);
        ranges.push({
          range: new this.editorComponent.monacoConfigService.monaco.Range(lineStart, indexStart, lineEnd, indexEnd),
          options: {inlineClassName: className || 'highlighted-code'}
        });

        return ranges;
      }, []);

      this.decorators = this.editorComponent.editor.deltaDecorations(this.decorators, []);
      this.decorators = this.editorComponent.editor.deltaDecorations(this.decorators, decorations);
    }
  }

}
