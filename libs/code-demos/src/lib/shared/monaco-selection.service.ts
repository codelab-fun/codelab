import { Injectable } from '@angular/core';

import { editor, Range } from 'monaco-editor';
import { Observable } from 'rxjs';
import { monacoReady } from './monaco-config.service';

export interface MonacoSelection {
  editor: editor.IStandaloneCodeEditor;
  range: Range;
  prefix: string;
  file: string;
}

@Injectable({
  providedIn: 'root',
})
export class MonacoSelectionService {
  readonly selection$ = new Observable<MonacoSelection | undefined>(
    (subscriber) => {
      monacoReady().then((monaco) => {
        monaco.editor.onDidCreateEditor((editor) => {
          editor.onDidChangeCursorSelection((result) => {
            const match = editor
              .getModel()
              .uri.path.match(/prefix\/(.+?)\/(.*)$/);

            if (!match) {
              return;
            }
            const [, prefix, file] = match;

            subscriber.next({ editor, range: result.selection, prefix, file });
          });
        });
      });
    }
  );
}
