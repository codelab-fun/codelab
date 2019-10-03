import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { extractExpressionByMatch } from '../utils';

@Component({
  selector: 'slides-full-screen-runner',
  templateUrl: './full-screen-runner.component.html',
  styleUrls: ['./full-screen-runner.component.css']
})
export class FullScreenRunnerComponent implements OnInit, OnChanges {
  @Input() code: any;
  cellSize = 10;
  wat: string;
  js: string;
  width = 2000;
  height = 1800;
  rowSize = 100;
  rule = 1;
  steps = 100;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.prepare();
  }

  prepare() {
    const expected = (256 + this.rule)
      .toString(2)
      .substr(1)
      .split('')
      .map(Number)
      .reverse()
      .map(n => (n ? '  $enable' : '  $disable'))
      .join('\n');

    this.wat = this.code.wat;
    this.js = this.code.js;
    this.js = this.js.replace(/size = \d+/, 'size = ' + this.cellSize);
    this.js = this.js.replace(/steps: \d+/, 'steps: ' + this.steps);
    this.js = this.js.replace(/rowSize: \d+/, 'rowSize: ' + this.rowSize);
    const elem = extractExpressionByMatch(/\(elem/, this.wat);
    const newElem = `(elem (i32.const 0)
  ${expected}
  )`;

    this.wat = this.wat.replace(elem, newElem);
  }
}
