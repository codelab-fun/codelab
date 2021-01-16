import { Component, Input } from '@angular/core';

export type PreviewWindowType = 'console' | 'browser';

@Component({
  selector: 'preview-window',
  templateUrl: './preview-window.component.html',
  styleUrls: ['./preview-window.component.scss']
})
export class PreviewWindowComponent {
  @Input() set url(url: string) {
    this._url = url.replace('about:blank', 'https://localhost:4200');
  }
  @Input() height = '';
  @Input() ui: PreviewWindowType = 'console';

  get url() {
    return this.ui === 'console' ? 'console' : this._url;
  }

  private _url = 'http://';
}
