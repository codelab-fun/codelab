import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slides-simple-tests-progress',
  templateUrl: './simple-tests-progress.component.html',
  styleUrls: ['./simple-tests-progress.component.css']
})
export class SimpleTestsProgressComponent implements OnInit {
  @Input() tests = [];

  countPassing() {
    return (this.tests || []).filter(test => test.pass).length;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
