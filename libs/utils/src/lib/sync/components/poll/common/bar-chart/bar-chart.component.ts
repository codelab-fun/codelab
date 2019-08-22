import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slides-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() highlightedIndex: number;
  @Input() vertical = false;

  max: number;
  breakdown: { value: number; key: string }[];

  constructor() {
  }

  @Input() set data(votes: { [k: string]: number; }) {
    this.breakdown = Object.entries(votes || {}).map(([key, value]) => ({key, value})).sort((a, b) => b.value - a.value);
    this.max = Math.max(...Object.values(votes || {}), 0);
  }

  trackBy(i: number) {
    return i;
  }

  ngOnInit() {
  }


}
