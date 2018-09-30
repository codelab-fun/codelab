import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BinaryParser } from '../../parser/binary-parser';
import { StringBinaryReader } from '../../parser/readers/string-reader';

@Component({
  selector: 'slides-binary-parent',
  templateUrl: './binary-parent.component.html',
  styleUrls: ['./binary-parent.component.scss']
})
export class BinaryParentComponent {
  @Input() showMeta = true;
  @Input() parser: BinaryParser;
  @Input() binary: string;

  @Output() updateBinary = new EventEmitter();
  structure: any;

  constructor() {
  }

  ngOnInit() {
    this.regenerate();
  }

  ngOnChanges() {
    this.regenerate();
  }

  regenerate() {
    this.structure = this.parser.readOrdered(new StringBinaryReader(this.binary));
  }

  update(chunk, value) {
    const len = chunk.end - chunk.start;
    value = value.padEnd(len, 0).slice(0, len);
    this.binary = this.binary.slice(0, chunk.start) + value + this.binary.substr(chunk.end)
    this.updateBinary.emit(this.binary);
    this.regenerate();
  }

  updatePart(chunk, value) {
    const len = chunk.end - chunk.start;
    value = value.padEnd(len, 0).slice(0, len);

    this.binary = this.binary.slice(0, chunk.start) + value + this.binary.substr(chunk.end)
    //
  }
}
