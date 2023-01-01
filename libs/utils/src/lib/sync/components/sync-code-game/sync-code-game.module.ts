import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncCodeGameComponent } from './sync-code-game.component';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { SimpleTestsProgressModule } from '../../../test-results/simple-tests-progress/simple-tests-progress.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { TestResultsModule } from '../../../test-results/test-results.module';
import { TypescriptCheckerRunnerModule } from '../../../sandbox-runner/typescript-checker-runner/typescript-checker-runner.module';
import { SandboxRunnerModule } from '../../../sandbox-runner/sandbox-runner.module';
import { SyncDirectivesModule } from '../../directives/sync-directives.module';
import { SyncCodeGamePresenterComponent } from './sync-code-game-presenter/sync-code-game-presenter.component';
import { SyncCodeGameAdminComponent } from './sync-code-game-admin/sync-code-game-admin.component';
import { SyncCodeGameViewerComponent } from './sync-code-game-viewer/sync-code-game-viewer.component';
import { MatButtonModule } from '@angular/material/button';

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
