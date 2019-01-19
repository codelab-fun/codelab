import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'code-demo-realtime-eval',
  templateUrl: './code-demo-realtime-eval.component.html',
  styleUrls: ['./code-demo-realtime-eval.component.css']
})
export class RealtimeEvalComponent implements OnInit {
  @Input() code = '';
  @Input() language = 'typescript';
  result: string;
  error: string;

  constructor() {}

  ngOnInit() {}

  evaluate() {
    try {
      this.result = eval(this.code);
      this.error = '';
    } catch (e) {
      this.result = '';
      this.error = e.message;
    }
  }
}
