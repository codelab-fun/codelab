import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'preview-browser-window',
  templateUrl: './browser-window.component.html',
  styleUrls: ['./browser-window.component.css']
})
export class BrowserWindowComponent implements OnInit {
  @Input() height = '';
  @Input() url = 'http://localhost:4200/';

  constructor() {}

  ngOnInit() {}
}
