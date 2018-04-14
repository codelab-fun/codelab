import { Component, Input, OnInit } from '@angular/core';

const code = require('!!raw-loader!./debugger.ts');
declare const require;

@Component({
  selector: 'slides-debugger-sample',
  templateUrl: './debugger.component.html',
  styleUrls: ['./debugger.component.css']
})
export class DebuggerComponent implements OnInit {
  @Input() fontSize = 20;
  code = code;

  constructor() {

  }

  run() {
    eval(this.code + ';weird()');
  }

  ngOnInit() {
  }

}
