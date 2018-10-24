import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BinaryParser } from '../parser/binary-parser';
import { StringBinaryReader } from '../parser/readers/string-reader';
import { BinaryParentComponent } from '../binary-view/binary-parent/binary-parent.component';

export function flatten(structure: any[], nesting = 0, parent = null, path = []) {
  return structure.reduce((result, item) => {
    if (item.type === 'object' || item.type === 'array') {
      result = result.concat(flatten(item.value, nesting + 1, item, [...path, item.name]))
    } else {
      item.nesting = nesting;
      item.parent = parent || item;
      item.root = item.parent.root || item.parent;
      item.path = path;
      item.className = path.map(p => 'parent-' + p).join(' ');
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
