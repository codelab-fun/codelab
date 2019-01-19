import { AfterViewInit, Directive, Input } from '@angular/core';
import { EditorComponent } from '../../../exercise/src/lib/editor/editor.component';

@Directive({
  // tslint:disable-next-line:all TODO: Fix linter warnings on the selector and delete this comment.
  selector: '[slidesBabelHighlightMatch]'
})
export class BabelHighlightDirective implements AfterViewInit {
  // tslint:disable-next-line:all TODO: Fix linter warnings on the next line and delete this comment.
  @Input('slidesBabelHighlightMatch') callback;

  constructor(private editorComponent: EditorComponent) {}

  ngAfterViewInit(): void {
    if (this.callback) {
      const matches = this.callback(this.editorComponent.code) || [];

      const decorations = matches.map(match => {
        return {
          range: new this.editorComponent.monacoConfigService.monaco.Range(
            ...match.loc
          ),
          options: { inlineClassName: match.className }
        };
      });

      this.editorComponent.editor.deltaDecorations([], decorations);
    }
  }
}
