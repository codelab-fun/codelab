import { Component, Input, OnInit } from '@angular/core';
import { BinaryParentComponent } from '../binary-parent/binary-parent.component';

@Component({
  selector: 'slides-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.css']
})
export class StringComponent implements OnInit {
  @Input() data: any;

  constructor(private readonly root: BinaryParentComponent) {
  }


  update(value) {
    const val = value.split('')
      .map(a => a.charCodeAt(0))
      .map(a => a.toString(2))
      .map(a => (a as any).padStart(8, 0)).join('');

    this.root.update(this.data, val);
  }

  ngOnInit() {
  }

}
