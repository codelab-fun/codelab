import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { TestRunResult } from '@codelab/utils/src/lib/test-results/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'slides-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent implements OnChanges {
  @Input() result: TestRunResult;
  @Output() selectFile = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges) {
    // TODO(kirjs): I'm mutating the value below, there should be a better way.
    if (changes.result && Array.isArray(this.result)) {
      for (const test of this.result.tests || []) {
        if (test.pass === false) {
          test.featured = true;
          return;
        }
      }
    }
  }
}
