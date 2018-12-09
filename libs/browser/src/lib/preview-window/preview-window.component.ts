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
  @Input() url: string;

  constructor() {
  }

  ngOnInit() {
  }

}
