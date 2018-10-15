import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BinaryParser } from '../parser/binary-parser';
import { StringBinaryReader } from '../parser/readers/string-reader';
import { BinaryParentComponent } from '../binary-view/binary-parent/binary-parent.component';

function flatten(structure: any[], nesting = 0) {
  return structure.reduce((result, item) => {
    if (item.type === 'object' || item.type === 'array') {
      result = result.concat(flatten(item.value, nesting + 1))
    } else {
      item.nesting = nesting;
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
  detailIndex = 30;
  structure: { start: number };

  constructor(private readonly root: BinaryParentComponent) {
  }

  @Input() set binary(binary: string) {
    this.structure = flatten(this.parser.readOrdered(new StringBinaryReader(binary)).value);
  }

  update(event, item) {
    this.root.update(item, event.target.textContent);
  }

  ngOnInit() {
  }
}
