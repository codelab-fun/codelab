import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { angularSampleCode } from '../shared/angular-sample';
import { ActivatedRoute } from '@angular/router';


function stripMarkdown(str = '') {

  return str.replace(/```typescript\s*\n([\s\S]*)\n```/, '$1').trim();
}

@Component({
  selector: 'codelab-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css']
})
export class SnippetComponent implements OnInit {

  code = {...angularSampleCode};
  title: string;
  tags: string[];
  content: string;
  @Output() openDemo = new EventEmitter();
  @Input() isDemoOpen = false;
  slug: string;

  constructor(private route: ActivatedRoute) {
    const id = route.snapshot.params.id;
    if (id) {
      this.snippet = route.snapshot.data.snippets.find(a => a.slug === id);
    }
  }

  @Input() set snippet(snippet) {
    if (snippet) {
      this.slug = snippet.slug;
      this.title = snippet.title;
      this.tags = snippet.tags;
      this.content = snippet.content;
      this.code['app.component.ts'] = stripMarkdown(snippet.componentcode) || this.code['app.component.ts'];
      this.code['app.module.ts'] = stripMarkdown(snippet.modulecode) || this.code['app.module.ts'];
    }
  }

  ngOnInit() {
  }

}
