import { Component, Input, OnInit } from '@angular/core';
import { sum } from '@codelab/utils/src/lib/sync/common';

@Component({
  selector: 'slides-stars-presenter',
  templateUrl: './stars-presenter.component.html',
  styleUrls: ['./stars-presenter.component.css']
})
export class StarsPresenterComponent implements OnInit {
  average: number;
  breakdown: number[];
  max: number;

  constructor() {
  }

  @Input() set votes(votes: { [k: string]: number; }) {
    const values = Object.values(votes);
    this.average = sum(values) / values.length;

    this.breakdown = values.reduce((r, a) => {
      r[a]++;
      return r;
    }, Array.from(Array(6), () => 0)).slice(1);
    this.max = Math.max(...this.breakdown);

  }
  trackBy(i: number){
    return i;
  }

  ngOnInit() {
  }

}
