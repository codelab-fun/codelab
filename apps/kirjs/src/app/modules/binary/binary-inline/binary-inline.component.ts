import { Component, Input } from '@angular/core';
import { flatten } from '../binary-flat/binary-flat.component';
import { StringBinaryReader } from '../parser/readers/string-reader';
import { BinaryParser } from '../parser/binary-parser';

@Component({
  selector: 'kirjs-binary-inline',
  templateUrl: './binary-inline.component.html',
  styleUrls: ['./binary-inline.component.css']
})
export class BinaryInlineComponent {
  @Input() filterClassName = /./;
  structure: any[];
  @Input() parser: BinaryParser;

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
