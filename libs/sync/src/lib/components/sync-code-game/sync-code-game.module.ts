import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncCodeGameComponent } from './sync-code-game.component';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { SyncDirectivesModule } from '../../directives/sync-directives.module';
import { SyncCodeGamePresenterComponent } from './sync-code-game-presenter/sync-code-game-presenter.component';
import { SyncCodeGameAdminComponent } from './sync-code-game-admin/sync-code-game-admin.component';
import { SyncCodeGameViewerComponent } from './sync-code-game-viewer/sync-code-game-viewer.component';
import { MatButtonModule } from '@angular/material/button';
import {
  SandboxRunnerModule,
  SimpleTestsProgressModule,
  TestResultsModule,
  TypescriptCheckerRunnerModule
} from '@codelab/utils';
import { CodeDemoModule } from '@codelab/code-demos';

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
    CodeDemoModule
  ]
})
export class SyncCodeGameModule {}
