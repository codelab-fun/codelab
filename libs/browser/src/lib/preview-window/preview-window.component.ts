import { Component, Input, OnInit } from '@angular/core';

export type PreviewWindowType = 'console' | 'browser';

@Component({
  selector: 'slides-preview-window',
  templateUrl: './preview-window.component.html',
  styleUrls: ['./preview-window.component.scss']
})
export class PreviewWindowComponent implements OnInit {
  @Input() height = '';
  @Input() ui: PreviewWindowType = 'console';

  constructor() {
  }

  private _url = 'http://';

  get url() {
    return this._url;
  }

  @Input() set url(url: string) {
    this._url = url.replace('about:blank', 'https://localhost:4200');
  }

  ngOnInit() {
  }

}
