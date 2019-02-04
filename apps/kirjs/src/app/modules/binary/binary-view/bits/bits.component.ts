import { Component, Input } from '@angular/core';
import { BinaryParentComponent } from '../binary-parent/binary-parent.component';

@Component({
  selector: 'kirjs-bits',
  templateUrl: './bits.component.html',
  styleUrls: ['./bits.component.css']
})
export class BitsComponent {
  @Input() data;
  @Input() showMeta = false;

  constructor(private readonly root: BinaryParentComponent) {}

  update(value) {
    this.root.update(this.data, Number(value).toString());
  }
}
