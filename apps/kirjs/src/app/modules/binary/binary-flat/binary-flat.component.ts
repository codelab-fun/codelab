import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { BinaryParser } from '../parser/binary-parser';
import { StringBinaryReader } from '../parser/readers/string-reader';
import { BinaryParentComponent } from '../binary-view/binary-parent/binary-parent.component';

export function flatten(
  structure: any[],
  nesting = 0,
  parent = null,
  path = []
) {
  return structure.reduce((result, item) => {
    if (item.type === 'object' || item.type === 'array') {
      item.data = false;
      item.nesting = nesting;
      item.className = 'tbd';
      result = result
        .concat(item)
        .concat(
          flatten(
            item.value,
            nesting + 1,
            item,
            item.name ? [...path, item.name] : [...path]
          )
        );
    } else {
      item.data = true;
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
  selector: 'kirjs-binary-flat',
  templateUrl: './binary-flat.component.html',
  styleUrls: ['./binary-flat.component.css']
})
export class BinaryFlatComponent implements OnChanges {
  @Input() parser: BinaryParser;
  @Input() binary: string;
  @Output() updateBinary = new EventEmitter();

  detailIndex = 30;
  structure: { start: number };

  constructor(private readonly root: BinaryParentComponent) {}

  update(event, item) {
    this.root.update(item, event.target.textContent);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('binary' in changes) {
      this.structure = flatten(
        this.parser.readOrdered(new StringBinaryReader(this.binary)).value
      );
    }
  }
}
