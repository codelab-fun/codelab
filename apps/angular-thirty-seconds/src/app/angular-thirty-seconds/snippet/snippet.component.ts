import { Component, Input, OnInit } from '@angular/core';
import { angularSampleCode } from '../shared/angular-sample';

@Component({
  selector: 'codelab-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css']
})
export class SnippetComponent implements OnInit {

  code = angularSampleCode;
  title: string;
  content: string;

  constructor() {
  }

  @Input() set snippet(snippet) {
    this.title = snippet.title;
    this.content = snippet.content;
    this.code['app.component.ts'] = snippet.componentcode || this.code['app.component.ts'];
    this.code['app.module.ts'] = snippet.modulecode || this.code['app.module.ts'];

  }

  ngOnInit() {
  }

}
