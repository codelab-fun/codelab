import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'code-demo-realtime-eval',
  templateUrl: './realtime-eval.component.html',
  styleUrls: ['./realtime-eval.component.css']
})
export class RealtimeEvalComponent implements OnInit {
  @Input() code = '';
  @Input() language = 'typescript';
  result: string;
  error: string;

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
