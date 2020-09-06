import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { BinaryParser } from '../parser/binary-parser';
import { StringBinaryReader } from '../parser/readers/string-reader';
import { flatten } from '../binary-flat/binary-flat.component';

@Component({
  selector: 'kirjs-binary-plain',
  templateUrl: './binary-plain.component.html',
  styleUrls: ['./binary-plain.component.css']
})
export class BinaryPlainComponent implements OnChanges {
  @Output() updateChunk = new EventEmitter();
  @Input() parser: BinaryParser;
  @Input() highlightGroups = false;
  @Input() filterClassName = /./;
  @Input() mini = false;
  @Input() showPopups = false;
  hackHack = {
    0x01: 'Types',
    0x02: 'Import',
    0x03: 'Function',
    0x05: 'Table',
    0x07: 'Export',
    0x08: 'Start',
    0x0a: 'Code'
  };
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
  @Input() binary: string;

  get highlighted() {
    return Object.keys(this.highlightedMap)
      .filter(key => this.highlightedMap[key])
      .join(' ');
  }

  ngOnChanges() {
    if (this.binary && this.parser) {
      try {
        this.structure = flatten(
          this.parser.readOrdered(new StringBinaryReader(this.binary)).value
        ).filter(a => a.className.match(this.filterClassName));
      } catch (e) {
        console.log(e);
      }
    }
  }

  update(chunk: any, value: any) {
    this.updateChunk.emit({ chunk, value });
  }
}
