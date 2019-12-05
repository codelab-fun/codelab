import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncCodeGameComponent } from './sync-code-game.component';
import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { SimpleTestsProgressModule } from '@codelab/utils/src/lib/test-results/simple-tests-progress/simple-tests-progress.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { TestResultsModule } from '@codelab/utils/src/lib/test-results/test-results.module';
import { TypescriptCheckerRunnerModule } from '@codelab/utils/src/lib/sandbox-runner/typescript-checker-runner/typescript-checker-runner.module';
import { SandboxRunnerModule } from '@codelab/utils/src/lib/sandbox-runner/sandbox-runner.module';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';

@NgModule({
  declarations: [SyncCodeGameComponent],
  exports: [SyncCodeGameComponent],
  imports: [
    CommonModule,
    CodeDemoModule,
    FormsModule,
    MatIconModule,
    SimpleTestsProgressModule,
    MatCheckboxModule,
    MatTabsModule,
    TestResultsModule,
    TypescriptCheckerRunnerModule,
    SandboxRunnerModule,
    SyncDirectivesModule
  ]
})
export class SyncCodeGameModule {}
