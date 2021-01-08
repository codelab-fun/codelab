import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'codelab-code-demo-console-editor',
  templateUrl: './codelab-code-demo-console.component.html',
  styleUrls: ['./codelab-code-demo-console.component.css']
})
export class CodelabCodeDemoConsoleComponent implements OnInit {
  @Input() data;
  @Output() dataChange = new EventEmitter();
  files = ['app.ts'];
  code = {};
  ui = 'browser';

  constructor() {}

  ngOnInit(): void {
    const props = JSON.parse(this.data);
    this.code = props.code
      ? JSON.parse(props.code)
      : { 'app.ts': ';console.log(i++);' };
    this.ui = props.ui;
  }

  update() {
    const props = {
      code: JSON.stringify(this.code)
    };

    this.dataChange.emit(props);
  }
}
