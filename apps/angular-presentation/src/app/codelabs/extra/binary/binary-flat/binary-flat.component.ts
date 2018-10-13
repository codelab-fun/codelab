import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BinaryParser } from '../parser/binary-parser';
import { StringBinaryReader } from '../parser/readers/string-reader';

function flatten(structure: any[]) {
  return structure.reduce((result, item) => {
    if (item.type === 'object' || item.type === 'array') {
      result = result.concat(flatten(item.value))
    } else {
      result.push(item);
    }
    return result;
  }, []);
}

@Component({
  selector: 'binary-flat',
  templateUrl: './binary-flat.component.html',
  styleUrls: ['./binary-flat.component.css']
})
export class BinaryFlatComponent implements OnInit {
  @Output() updateBinary = new EventEmitter();
  @Input() parser: BinaryParser;
  detailIndex = 3;
  private structure: { start: number };

  @Input() set binary(binary: string) {
    this.structure = flatten(this.parser.readOrdered(new StringBinaryReader(binary)).value);
  }

  ngOnInit() {
  }

}
