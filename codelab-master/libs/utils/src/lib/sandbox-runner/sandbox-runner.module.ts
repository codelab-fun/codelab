import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRunnerComponent } from '@codelab/utils/src/lib/sandbox-runner/test-runner.component';
import { TypescriptTestRunnerComponent } from '@codelab/utils/src/lib/sandbox-runner/typescript-test-runner/typescript-test-runner.component';
import { TestResultsModule } from '@codelab/utils/src/lib/test-results/test-results.module';

@NgModule({
  declarations: [TestRunnerComponent, TypescriptTestRunnerComponent],
  exports: [TestRunnerComponent, TypescriptTestRunnerComponent],
  imports: [CommonModule, TestResultsModule]
})
export class SandboxRunnerModule {}
