import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'codelab-code-demo-console-editor',
  templateUrl: './codelab-code-demo-console.component.html',
  styleUrls: ['./codelab-code-demo-console.component.css']
})
export class CodelabCodeDemoConsoleComponent {
  @Input() files = ['app.ts'];
  @Input() code = {};
  @Input() ui = 'browser';

  constructor() {}
  update() {}
}
