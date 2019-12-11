import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestResult } from '@codelab/utils/src/lib/test-results/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'slides-test-run-results',
  templateUrl: './test-run-results.component.html',
  styleUrls: ['./test-run-results.component.scss']
})
export class TestRunResultsComponent implements OnInit {
  @Output() selectFile = new EventEmitter<string>();
  @Input() tests: TestResult[];
  @Input() seeAll = false;
  @Input() focused = true;

  getName(test) {
    return test.name;
  }

  constructor() {}

  ngOnInit() {}
}
