import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kirjs-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.css']
})
export class ArrayComponent implements OnInit {
  @Input() data;
  @Input() showMeta: boolean;

  constructor() {}

  trackBy(i, data) {
    return data.index;
  }

  ngOnInit() {}
}
