import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Parser } from 'binary-parser';
import { Buffer } from 'buffer';
import { bin2hex } from '../shared';

(window as any).Buffer = Buffer;

@Component({
  selector: 'kirjs-binary-parser-demo',
  templateUrl: './binary-parser-demo.component.html',
  styleUrls: ['./binary-parser-demo.component.css']
})
export class BinaryParserDemoComponent implements OnInit {
  @Input() helpers;
  code = '';

  @Input() filterClassName = /./;
  result = '';
  @Input() binary = '';
  error = '';
  onCodeChange = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.code = this.helpers[0];
    this.generateCode();
  }

  generateCode() {
    this.onCodeChange.emit(this.code);
    this.error = '';
    try {
      const parser = new Function(
        'Parser',
        'const parser = ' + this.code + '; return parser;'
      )(Parser);
      this.result = JSON.stringify(
        parser.parse(Buffer.from(bin2hex(this.binary), 'hex')),
        null,
        '  '
      );
    } catch (e) {
      this.error = e.message;
    }
  }
}
