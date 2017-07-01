import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slides-tests-progress',
  templateUrl: './tests-progress.component.html',
  styleUrls: ['./tests-progress.component.css']
})
export class TestsProgressComponent implements OnInit {
  @Input() tests = [];

  countPassing() {
    return (this.tests || []).filter(test => test.pass).length;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
