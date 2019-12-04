import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { TestRunnerService } from '@codelab/utils/src/lib/sandbox-runner/test-runner.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TestRunResult } from '@codelab/utils/src/lib/test-results/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'slides-test-runner',
  templateUrl: './test-runner.component.html',
  styleUrls: ['./test-runner.component.scss']
})
export class TestRunnerComponent implements OnChanges {
  @Input() code;
  @Input() tests;

  @Output() result = new EventEmitter();

  readonly result$: Observable<TestRunResult> = this.testRunner.result$.pipe(
    // TODO(kirjs): Figure out why result$ can't be an output.
    tap(a => this.result.next(a))
  );

  ngOnChanges() {
    this.testRunner.run(this.code, this.tests);
  }

  constructor(private testRunner: TestRunnerService) {}
}
