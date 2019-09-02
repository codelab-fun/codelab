import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BinaryParser } from '../parser/binary-parser';
import { StringBinaryReader } from '../parser/readers/string-reader';
import { flatten } from '../binary-flat/binary-flat.component';

@Component({
  selector: 'kirjs-binary-plain',
  templateUrl: './binary-plain.component.html',
  styleUrls: ['./binary-plain.component.css']
})
export class BinaryPlainComponent {
  @Output() updateBinary = new EventEmitter();
  @Input() parser: BinaryParser;
  @Input() highlightGroups = false;
  @Input() filterClassName = /./;
  @Input() mini = false;
  @Input() showPopups = false;

  show = [];

  types = ['boolean', 'number', 'hex', 'string', 'const', 'enums'];

  @Input()
  spacing = false;

  @Input()
  highlightedMap = this.types.reduce((r, v) => {
    r[v] = false;
    return r;
  }, {});

  structure: any[];

  get highlighted() {
    return Object.keys(this.highlightedMap)
      .filter(key => this.highlightedMap[key])
      .join(' ');
  }

  update(item: any, innerText: any){

  }

  @Input() set binary(binary: string) {
    try {
      this.structure = flatten(
        this.parser.readOrdered(new StringBinaryReader(binary)).value
      ).filter(a => a.className.match(this.filterClassName));
    } catch (e) {
      console.log(e);
      //  lol
    }
  }

}
