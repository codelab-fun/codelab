import { Directive, Input, OnChanges } from '@angular/core';
import { CodeDemoEditorComponent } from './code-demo-editor.component';

@Directive({
  selector: '[codeDemoSimpleHighlight]'
})
export class SimpleHighlightDirective implements OnChanges {
  decorators: any;
  @Input() codeDemoSimpleHighlight;

  constructor(private readonly editorComponent: CodeDemoEditorComponent) {}

  ngOnChanges() {
    if (this.editorComponent.editor) {
      const ranges = [];

      if (this.codeDemoSimpleHighlight) {
        ranges.push({
          range: new this.editorComponent.monacoConfigService.monaco.Range(
            ...this.codeDemoSimpleHighlight
          ),
          options: { inlineClassName: 'highlighted-code' }
        });
      }

      this.decorators = this.editorComponent.editor.deltaDecorations(
        this.decorators || [],
        ranges
      );
    }
  }
}
