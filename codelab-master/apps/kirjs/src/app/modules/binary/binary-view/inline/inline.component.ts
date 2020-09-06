import { Component, Input, OnInit } from '@angular/core';
import { InlineRootComponent } from '../inline-root/inline-root.component';
import { BinaryParentComponent } from '../binary-parent/binary-parent.component';

@Component({
  selector: 'kirjs-inline',
  templateUrl: './inline.component.html',
  styleUrls: ['./inline.component.css']
})
export class InlineComponent implements OnInit {
  isArray: boolean;
  private value: any;

  constructor(
    private readonly root: InlineRootComponent,
    private readonly binaryRoot: BinaryParentComponent
  ) {}

  private _data: any;

  get data() {
    return this._data;
  }

  @Input()
  set data(data) {
    this._data = data;
    this.value = data.value;
    this.isArray = Array.isArray(data.value);
  }

  updateValue(value) {
    this.binaryRoot.update(this.data, value);
  }

  ngOnInit() {}

  display() {
    this.root.display(this.data);
  }
}
