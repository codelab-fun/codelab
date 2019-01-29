import { AfterViewInit, Directive, Input, Self } from '@angular/core';
import { CodeDemoEditorInjector } from '../code-demo-editor.injector';

@Directive({
  selector: '[autoFolding]'
})
export class CodeDemoEditorAutoFoldingDirective implements AfterViewInit{

  @Input() autoFolding: boolean = true;

  constructor(@Self() private editorInjector: CodeDemoEditorInjector) { }

  ngAfterViewInit(): void {
    const editor = this.editorInjector.editor;
    const folding = editor.getAction('editor.fold');
    if (folding) {
      folding.run();
    }
  }

}
