import { AfterContentInit, ContentChildren, Directive } from '@angular/core';
import { findHighlightsAll } from './parse-hello-world-ast';
import { CodeEditorComponent } from '../../../exercise/code-editor/code-editor.component';

@Directive({
  selector: '[slidesMatchTypesOnHover]'
})
export class MatchTypesOnHoverDirective implements AfterContentInit {
  @ContentChildren(CodeEditorComponent) editors;


  markupTypes(editor) {
    const code = editor.code;


    const matches = findHighlightsAll(code, (node) => {
      if (node.type === 'Identifier') {
        return 'Identifier-' + node.name;
      }
      return node.type;
    });

    const decorations = matches.map(match => {
      return {
        range: new editor.monacoConfig.monaco.Range(...match.loc),
        options: {inlineClassName: match.className}
      };
    });


    editor.editor.editor.deltaDecorations([], decorations);
  }

  ngAfterContentInit() {
  }

}
