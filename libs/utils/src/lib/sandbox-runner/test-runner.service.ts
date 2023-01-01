import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestRunner } from './test-runner';
import { WebworkerRunner } from "./runners/webworker";
import { TestRunResult } from '../test-results/common';
import { ScriptLoaderService } from '../script-loader/script-loader.service';

@Injectable({
  providedIn: 'root',
})
export class TestRunnerService {
  readonly testRunner = new TestRunner(
    this.scriptLoaderService,
    new WebworkerRunner()
  );
  readonly result$: Observable<TestRunResult> = this.testRunner.result$;

  constructor(private scriptLoaderService: ScriptLoaderService) {}

  run(code: string, tests?: string) {
    this.testRunner.run(code, tests);
  }
}
