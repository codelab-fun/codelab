import { AfterViewInit, Directive, Host, Input, OnChanges, Optional } from '@angular/core';
import { SimpleEditorComponent } from './simple-editor.component';
import { findPosition } from '../../../../tooltips/src/lib/utils';
import { EditorFromModelComponent } from '../../../../../apps/angular-presentation/src/app/codelabs/components/multitab-editor/editor-from-model/editor-from-model.component';

@Directive({
  selector: '[slidesSimpleHighlightMatch]'
})
export class SimpleHighlightMatchDirective implements OnChanges, AfterViewInit {

  decorators = [];
  @Input() slidesSimpleHighlightMatch;
  @Input() ngModel;
  private editorComponent: SimpleEditorComponent | EditorFromModelComponent;

  constructor(
    @Optional() @Host() editor1: SimpleEditorComponent,
    @Optional() @Host() editor2: EditorFromModelComponent
  ) {
    this.editorComponent = editor1 || editor2;
  }

  ngAfterViewInit() {
    this.highlight();
    // TODO(kirjs): Get rid of the timeout
    window.setTimeout(() => {
      this.highlight()
    }, 1000);
  }

  highlight() {
    if (!this.editorComponent) {
      return;
    }

    if (this.editorComponent.editor) {
      if (!this.slidesSimpleHighlightMatch) {
        return;
      }

      if (!Array.isArray(this.slidesSimpleHighlightMatch)) {
        this.slidesSimpleHighlightMatch = [this.slidesSimpleHighlightMatch];
      }

      if (!this.editorComponent.editor.getModel()) {
        return;
      }
      const code = this.editorComponent.editor.getModel().getValue();

      if (!code.length) {
        return;
      }


      const decorations = this.slidesSimpleHighlightMatch.map(match => ({match})).reduce((ranges, {match, className}) => {
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

  ngOnChanges() {
    this.highlight();
  }

}
