import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Optional,
  Output,
  Self
} from '@angular/core';
import { CodeDemoEditorInjector } from '@codelab/code-demos/src/lib/code-demo-editor/code-demo-editor.injector';
import { getTypeScript } from '@codelab/utils/src/lib/loaders/loaders';
import { serializeBlocks } from '../../utils';
import { CodePath } from './common';

const ts = getTypeScript();

const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed
});

const usefulTypes = new Set([
  ts.SyntaxKind.SourceFile,
  ts.SyntaxKind.FunctionDeclaration
]);

function getName(token) {
  if (token.kind === ts.SyntaxKind.FunctionDeclaration) {
    return token.name.text;
  }
}

function resolveToken(token, sourceFile) {
  const code = printer.printNode(ts.EmitHint.Unspecified, token, sourceFile);

  const name = getName(token);
  return {
    code,
    type: ts.SyntaxKind[token.kind],
    ...token,
    name
  };
}

function processBlocks(blocks: any[], sourceFile) {
  return blocks
    .map(b => resolveToken(b, sourceFile))
    .filter(b => {
      return usefulTypes.has(b.kind);
    });
}

@Directive({
  selector: '[slidesMonacoJsPosition]'
})
export class MonacoJsPositionDirective implements AfterViewInit {
  @Output() slidesMonacoJsPosition = new EventEmitter<CodePath>();
  lastResult: string;

  constructor(
    @Self() @Optional() private editorInjector: CodeDemoEditorInjector
  ) {}

  ngAfterViewInit() {
    const editor = this.editorInjector.editor;
    editor.onDidChangeCursorPosition(({ position }) => {
      const model = editor.getModel();
      const value = model.getValue();
      const sourceFile = ts.createSourceFile(
        'file.ts',
        value,
        ts.ScriptTarget.ES2015,
        /*setParentNodes */ true
      );

      const offset = model.getOffsetAt(position);
      let token = (ts as any).getTokenAtPosition(sourceFile, offset);
      const blocks = [token];
      while (token.parent && token.kind) {
        token = token.parent;
        blocks.push(token);
      }

      const processedBlocks = processBlocks(blocks, sourceFile);

      const result = serializeBlocks(processedBlocks);
      // If we're in the same path and value is the same, let's not update
      const key = result + value;
      if (this.lastResult !== key) {
        this.lastResult = key;
        this.slidesMonacoJsPosition.emit({
          type: 'ts',
          blocks: processedBlocks
        });
      }
    });
  }
}
