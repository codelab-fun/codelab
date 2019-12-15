import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import { TestRunnerService } from '@codelab/utils/src/lib/sandbox-runner/test-runner.service';
import { filter, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'slides-test-runner',
  templateUrl: './test-runner.component.html',
  styleUrls: ['./test-runner.component.scss']
})
export class TestRunnerComponent implements OnChanges, OnDestroy {
  @Input() code;
  @Input() tests;

  @Output() result = new EventEmitter();
  readonly destroy$ = new ReplaySubject(1);
  readonly result$ = this.testRunner.result$;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.code || changes.tests) {
      this.testRunner.run(this.code, this.tests);
    }
  }

  constructor(private testRunner: TestRunnerService) {
    this.result$
      .pipe(
        filter(result => {
          return (
            !!result.error || result.tests.every(t => t.pass !== undefined)
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(this.result);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
