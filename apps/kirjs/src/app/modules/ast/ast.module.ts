import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { AstPreviewRunnerModule } from './ast-preview-runner/ast-preview-runner.module';
import { BrowserWindowModule } from '@codelab/browser';

import { NewProgressBarModule } from './new-progress-bar/new-progress-bar.module';
import { AstComponent } from './ast.component';
import { DebuggerComponent } from './debugger/debugger.component';
import { TestSetComponent } from './test-set/test-set.component';

import { SizePickerModule } from './size-picker/size-picker.module';

import { FeedbackModule } from '@codelab/feedback';
import { SlidesModule } from '@codelab/slides';
import { BabelTestRunnerComponent } from './test-set/babel-test-runner/babel-test-runner.component';
import { CodeDemoModule } from '@codelab/code-demos';
import { AngularSlidesToPdfModule } from '@codelab/angular-slides-to-pdf';

const routes = RouterModule.forChild(SlidesRoutes.get(AstComponent));

@NgModule({
  imports: [
    routes,
    CommonModule,
    AstPreviewRunnerModule,

    SlidesModule,
    BrowserWindowModule,
    FeedbackModule,
    CodeDemoModule,
    FormsModule,
    SizePickerModule,
    MatCardModule,
    NewProgressBarModule,
    AngularSlidesToPdfModule
  ],
  declarations: [
    AstComponent,
    BabelTestRunnerComponent,
    DebuggerComponent,
    TestSetComponent
  ],
  exports: [AstComponent]
})
export class AstModule {}
