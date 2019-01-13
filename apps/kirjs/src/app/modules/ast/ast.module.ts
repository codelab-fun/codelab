import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { SlidesRoutes } from '@codelab/presentation/src/lib/slide-routes';
import { AstPreviewRunnerModule } from './ast-preview-runner/ast-preview-runner.module';
import { BrowserWindowModule } from '@codelab/browser';
import { SimpleEditorModule } from '../../../../../../libs/code-demos/src/lib/editor/simple-editor.module';
import { NewProgressBarModule } from './new-progress-bar/new-progress-bar.module';
import { AstComponent } from './ast.component';
import { DebuggerComponent } from './debugger/debugger.component';
import { TestSetComponent } from './test-set/test-set.component';
import { AngularSlidesToPdfModule } from '@codelab/angular-slides-to-pdf';
import { FakeBabelModule } from '../../../../../../libs/exercise/src/lib/fake-babel-runner/fake-babel-runner.module';
import { SizePickerModule } from './size-picker/size-picker.module';
import { TooltipsModule } from '@codelab/tooltips';

import { PresentationModule } from '@codelab/presentation';
import { FeedbackModule } from '../../../../../../libs/feedback/src/lib/feedback.module';
import { ExerciseModule } from '../../../../../../libs/exercise/src/lib/exercise.module';
import { SlidesModule } from '@codelab/slides';

const routes = RouterModule.forChild(
  SlidesRoutes.get(AstComponent)
);

@NgModule({
  imports: [
    routes,
    CommonModule,
    AstPreviewRunnerModule,
    PresentationModule,
    ExerciseModule,
    SlidesModule,
    BrowserWindowModule,
    FeedbackModule,
    SimpleEditorModule,
    FlexLayoutModule,
    FormsModule,

    TooltipsModule,
    SizePickerModule,
    MatCardModule,
    FakeBabelModule,
    NewProgressBarModule,
    AngularSlidesToPdfModule,
  ],
  declarations: [
    AstComponent,
    DebuggerComponent,
    TestSetComponent,
  ],
  exports: [AstComponent]
})
export class AstModule {

}
