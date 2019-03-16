import { Component, Input } from '@angular/core';
import { angularSampleCode } from '../shared';

@Component({
  selector: 'codelab-snippet-demo',
  templateUrl: './snippet-demo.component.html',
  styleUrls: ['./snippet-demo.component.css']
})
export class SnippetDemoComponent {
  defaultCode = angularSampleCode;

  @Input() set code(code: any) {
    this.defaultCode['app.component.ts'] = code.componentcode || this.defaultCode['app.component.ts'];
    this.defaultCode['app.module.ts'] = code.modulecode || this.defaultCode['app.module.ts'];
  }
}
