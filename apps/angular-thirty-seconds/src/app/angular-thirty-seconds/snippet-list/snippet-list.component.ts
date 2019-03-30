import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'codelab-snippet-list',
  templateUrl: './snippet-list.component.html',
  styleUrls: ['./snippet-list.component.css']
})
export class SnippetListComponent {
  activeSnippet?: any;
  snippets: any[];
  tag: string;

  constructor(private route: ActivatedRoute) {
    this.snippets = route.snapshot.data.snippets;
    this.tag = this.route.snapshot.params.tag;
    if (this.tag) {
      this.snippets = this.snippets.filter(a => a.tags.includes(this.tag));
    }
  }
}
