import { Component, Input, OnInit } from '@angular/core';
import { BinaryParentComponent } from '../binary-parent/binary-parent.component';

@Component({
  selector: 'slides-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  color: string;

  constructor(private readonly root: BinaryParentComponent) {
  }

  private _data: any;

  @Input()
  set data(data) {
    this._data = data;
    this.color = data.value.toString(16);
  }

  update(value) {
    const val = (parseInt(value.slice(1), 16).toString(2) as any).padStart(24, 0);
    this.root.update(this._data, val);
  }

  ngOnInit() {
  }

}
