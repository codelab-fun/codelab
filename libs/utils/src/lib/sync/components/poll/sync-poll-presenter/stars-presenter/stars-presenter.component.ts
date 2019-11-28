import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { sum } from '@codelab/utils/src/lib/sync/common';

@Component({
  selector: 'codelab-stars-presenter',
  templateUrl: './stars-presenter.component.html',
  styleUrls: ['./stars-presenter.component.css']
})
export class StarsPresenterComponent implements OnChanges {
  @Input() votes: { [k: string]: number };

  average: number;
  breakdown: number[];
  max: number;

  constructor() {}

  trackBy(i: number) {
    return i;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('votes' in changes) {
      const values = Object.values(this.votes);
      this.average = sum(values) / values.length;

      this.breakdown = values
        .reduce((r, a) => {
          r[a]++;
          return r;
        }, Array.from(Array(6), () => 0))
        .slice(1);
      this.max = Math.max(...this.breakdown);
    }
  }
}
