import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { flatten } from '../binary-flat/binary-flat.component';
import { StringBinaryReader } from '../parser/readers/string-reader';
import { BinaryParser } from '../parser/binary-parser';

@Component({
  selector: 'kirjs-binary-inline',
  templateUrl: './binary-inline.component.html',
  styleUrls: ['./binary-inline.component.css']
})
export class BinaryInlineComponent implements OnChanges {
  @Input() filterClassName = /./;
  @Input() parser: BinaryParser;
  @Input() binary: string;

  structure: any[];

  ngOnChanges(changes: SimpleChanges): void {
    if ('binary' in changes) {
      try {
        this.structure = flatten(
          this.parser.readOrdered(new StringBinaryReader(this.binary)).value
        ).filter(a => a.className.match(this.filterClassName));
      } catch (e) {
        console.log(e);
      }
    }
  }
}
