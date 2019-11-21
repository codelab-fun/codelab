import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { ScriptLoaderService } from '@codelab/code-demos/src/lib/shared/script-loader.service';
import { TestRunnerService } from '@codelab/utils/src/lib/sandbox-runner/test-runner.service';
import produce from 'immer';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'slides-test-runner',
  templateUrl: './test-runner.component.html',
  styleUrls: ['./test-runner.component.scss']
})
export class TestRunnerComponent implements OnChanges {
  @Input() code;
  @Input() tests;

  @Output() result = new EventEmitter();
  seeAll = false;
  readonly result$ = this.testRunner.result$.pipe(
    // TODO(kirjs): Figure out why result$ can't be an output.
    tap(a => this.result.next(a)),
    map(
      produce(result => {
        for (const test of result.tests) {
          if (test.pass === false) {
            test.featured = true;
            return;
          }
        }
      })
    )
  );

  ngOnChanges() {
    this.testRunner.run(this.code, this.tests);
  }

  getName(test) {
    return test.name;
  }

  constructor(
    private scriptLoaderService: ScriptLoaderService,
    private testRunner: TestRunnerService
  ) {}
}
