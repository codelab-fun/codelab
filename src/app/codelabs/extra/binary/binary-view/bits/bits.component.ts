import { Component, Input, OnInit } from '@angular/core';
import { BinaryParentComponent } from '../binary-parent/binary-parent.component';

@Component({
  selector: 'slides-bits',
  templateUrl: './bits.component.html',
  styleUrls: ['./bits.component.css']
})
export class BitsComponent implements OnInit {
  @Input() data;

  constructor(private readonly root: BinaryParentComponent) {
  }


  ngOnInit() {
  }

  update(value) {

    this.root.update(this.data, value === 'on' ? '1' : '0');
  }

}
