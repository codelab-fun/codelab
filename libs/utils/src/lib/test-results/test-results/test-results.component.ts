import { Component, Input, OnInit } from '@angular/core';
import { TestRunResult } from '@codelab/utils/src/lib/test-results/common';

@Component({
  selector: 'slides-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent implements OnInit {
  @Input() result: TestRunResult;

  constructor() {}

  ngOnInit() {}
}
