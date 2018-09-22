import { Component, Input, OnInit } from '@angular/core';
import { BinaryParentComponent } from '../binary-parent/binary-parent.component';

@Component({
  selector: 'slides-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent implements OnInit {
  @Input() data: any;

  constructor(private readonly root: BinaryParentComponent) {
  }

  update(value) {
    const val = (Number(value).toString(2) as any).padStart(this.data.length, 0);
    this.root.update(this.data, val.slice(8) + val.slice(0, 8));
  }


  ngOnInit() {
  }

}
