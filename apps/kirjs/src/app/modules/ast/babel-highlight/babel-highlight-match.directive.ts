import { AfterViewInit, Directive, Input, NgModule } from '@angular/core';
import { CodeDemoEditorComponent } from '@codelab/code-demos';

// TODO(kirjs): Uncommit
@Directive({
  selector: '[slidesBabelHighlightMatch]',
})
export class BabelHighlightDirective implements AfterViewInit {
  @Input('slidesBabelHighlightMatch') callback;

  constructor(private editorComponent: CodeDemoEditorComponent) {}

  ngAfterViewInit(): void {
    if (this.callback) {
      const matches = this.callback(this.editorComponent.code) || [];

      const decorations = matches.map((match) => {
        return {
          range: new this.editorComponent.monacoConfigService.monaco.Range(
            ...match.loc
          ),
          options: { inlineClassName: match.className },
        };
      });

      this.editorComponent.editor.deltaDecorations([], decorations);
    }
  }
}

@NgModule({
  declarations: [BabelHighlightDirective],
})
export class MockaADASDASDASDASDASDModule {}
