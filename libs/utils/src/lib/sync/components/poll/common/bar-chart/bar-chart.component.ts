import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'codelab-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges {
  @Input() highlightedIndex: number;
  @Input() vertical = false;
  @Input() data: { [k: string]: number };
  max: number;
  breakdown: { value: number; key: string }[];

  constructor() {}

  trackBy(i: number) {
    return i;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      this.breakdown = Object.entries(this.data || {}).map(([key, value]) => ({
        key,
        value
      }));
      this.max = Math.max(...Object.values(this.data || {}), 0);
    }
  }
}
