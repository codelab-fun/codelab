import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TestRunnerService } from './test-runner.service';
import { filter, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'slides-test-runner',
  templateUrl: './test-runner.component.html',
  styleUrls: ['./test-runner.component.scss'],
})
export class TestRunnerComponent implements OnChanges, OnDestroy {
  @Input() code;
  @Input() tests;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() result = new EventEmitter();
  readonly destroy$ = new ReplaySubject<void>(1);
  readonly result$ = this.testRunner.result$;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.code || changes.tests) {
      this.testRunner.run(this.code, this.tests);
    }
  }

  constructor(private testRunner: TestRunnerService) {
    this.result$
      .pipe(
        filter((result) => {
          return (
            !!result.error || result.tests.every((t) => t.pass !== undefined)
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
