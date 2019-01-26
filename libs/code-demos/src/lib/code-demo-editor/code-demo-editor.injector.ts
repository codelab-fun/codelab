import { Injectable } from '@angular/core';
import { editor } from 'monaco-editor';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

@Injectable()
export class CodeDemoEditorInjector {
  editor: IStandaloneCodeEditor;
}
