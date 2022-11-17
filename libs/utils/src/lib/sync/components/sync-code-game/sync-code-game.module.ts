import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncCodeGameComponent } from './sync-code-game.component';
import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { SimpleTestsProgressModule } from '@codelab/utils/src/lib/test-results/simple-tests-progress/simple-tests-progress.module';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { TestResultsModule } from '@codelab/utils/src/lib/test-results/test-results.module';
import { TypescriptCheckerRunnerModule } from '@codelab/utils/src/lib/sandbox-runner/typescript-checker-runner/typescript-checker-runner.module';
import { SandboxRunnerModule } from '@codelab/utils/src/lib/sandbox-runner/sandbox-runner.module';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { SyncCodeGamePresenterComponent } from './sync-code-game-presenter/sync-code-game-presenter.component';
import { SyncCodeGameAdminComponent } from './sync-code-game-admin/sync-code-game-admin.component';
import { SyncCodeGameViewerComponent } from './sync-code-game-viewer/sync-code-game-viewer.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  declarations: [
    SyncCodeGameComponent,
    SyncCodeGamePresenterComponent,
    SyncCodeGameAdminComponent,
    SyncCodeGameViewerComponent,
  ],
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
    SyncDirectivesModule,
    MatButtonModule,
  ],
})
export class SyncCodeGameModule {}
