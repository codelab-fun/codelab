import { Component, Input, OnInit } from '@angular/core';
import { BinaryParentComponent } from '../binary-parent/binary-parent.component';

@Component({
  selector: 'kirjs-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.css']
})
export class StringComponent implements OnInit {
  get data() {
    return this._data;
  }

  @Input()
  set data(data) {
    this._data = data;
  }

  @Input() showMeta = false;

  _data: any;

  constructor(private readonly root: BinaryParentComponent) {}

  updateBinary(binary) {
    this.root.update(this.data, binary);
  }

  update(value) {
    const val = value
      .split('')
      .map(a => a.charCodeAt(0))
      .map(a => a.toString(2))
      .map(a => (a as any).padStart(8, 0))
      .join('');

    this.root.update(this.data, val);
  }

  ngOnInit() {}
}
