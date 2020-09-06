import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  TestResult,
  TestRunResult
} from '@codelab/utils/src/lib/test-results/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'slides-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestResultsComponent implements OnChanges {
  @Input() result: TestRunResult;
  @Output() selectFile = new EventEmitter<string>();
  @Input() focused = true;
  @Input() showProgress = true;
  tests: TestResult[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.result && this.result && Array.isArray(this.result.tests)) {
      let hasFailures = false;
      this.tests = this.result.tests.map(t => {
        const result = { ...t, featured: !t.pass && !hasFailures };
        if (!t.pass) {
          hasFailures = true;
        }
        return result;
      });
    }
  }
}
