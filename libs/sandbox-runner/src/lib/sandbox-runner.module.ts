import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRunnerComponent } from './test-runner.component';
import { TypescriptTestRunnerComponent } from './typescript-test-runner/typescript-test-runner.component';
import { TestResultsModule } from '@codelab/utils';

@NgModule({
  declarations: [TestRunnerComponent, TypescriptTestRunnerComponent],
  exports: [TestRunnerComponent, TypescriptTestRunnerComponent],
  imports: [CommonModule, TestResultsModule],
})
export class SandboxRunnerModule {}