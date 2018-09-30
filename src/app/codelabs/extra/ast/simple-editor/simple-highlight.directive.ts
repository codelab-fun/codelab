import { Directive, Input, OnChanges } from '@angular/core';
import { SimpleEditorComponent } from './editor.component';

@Directive({
  selector: '[slidesSimpleHighlight]'
})
export class SimpleHighlightDirective implements OnChanges {

  decorators: any;
  @Input() slidesSimpleHighlight;

  constructor(private readonly editorComponent: SimpleEditorComponent) {
  }

  ngOnChanges() {
    if (this.editorComponent.editor) {
      const ranges = [];

      if (this.slidesSimpleHighlight) {
        ranges.push({
          range: new this.editorComponent.monacoConfigService.monaco.Range(...this.slidesSimpleHighlight),
          options: {inlineClassName: 'highlighted-code'}
        });
      }

      this.decorators = this.editorComponent.editor.deltaDecorations(this.decorators || [], ranges);
    }
  }

}
