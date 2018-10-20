import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BinaryParser } from '../parser/binary-parser';
import { StringBinaryReader } from '../parser/readers/string-reader';
import { flatten } from '../binary-flat/binary-flat.component';

@Component({
  selector: 'kirjs-binary-plain',
  templateUrl: './binary-plain.component.html',
  styleUrls: ['./binary-plain.component.css']
})
export class BinaryPlainComponent implements OnInit {
  @Output() updateBinary = new EventEmitter();
  @Input() parser: BinaryParser;
  types = [
    'const', 'boolean', 'number', 'hex', 'string', 'enums',
  ];
  spacing = false;

  highlightedMap = this.types.reduce((r, v) => {
    r[v] = false;
    return r;
  }, {});

  private structure: any;

  constructor() {
  }

  get highlighted() {
    return Object.keys(this.highlightedMap).filter(key => this.highlightedMap[key]).join(' ');
  }

  @Input() set binary(binary: string) {
    this.structure = flatten(this.parser.readOrdered(new StringBinaryReader(binary)).value);
  }

  ngOnInit() {
  }

}
