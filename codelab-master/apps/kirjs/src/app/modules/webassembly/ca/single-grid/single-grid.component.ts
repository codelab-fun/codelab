import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slides-single-grid',
  templateUrl: './single-grid.component.html',
  styleUrls: ['./single-grid.component.css']
})
export class SingleGridComponent implements OnInit {
  readonly f = [...new Array(9)].map((a, i) => i);
  readonly randomDelays = this.f.map(a => this.f.map(b => Math.random() * 5));

  constructor() {}

  ngOnInit() {}
}
