import { Component, Input, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'codelab-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  @Input() snippet: any;

  constructor(private readonly meta: Meta) {
  }

  share() {
    this.meta.addTags([
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: '@kirjs'},
      {name: 'twitter:title', content: '30 Seconds Of Angular :: ' + this.snippet.title}
    ], false);
  }

  ngOnInit() {
  }

}
