import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';

import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from '../../../presentation/presentation.module';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { BrowserWindowModule } from '../../../browser/browser.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { AstComponent } from './ast.component';
import { TooltipsModule } from '../../../tooltips/tooltips.module';
import { MatchTypesOnHoverDirective } from './match-types-on-hover.directive';
import { FakeBabelModule } from '../../../exercise/fake-babel-runner/fake-babel-runner.module';
import { AstPreviewRunnerModule } from './ast-preview-runner/ast-preview-runner.module';
import { FormsModule } from '@angular/forms';
import { SimpleHighlightDirective } from './simple-editor/simple-highlight.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DebuggerComponent } from './debugger/debugger.component';
import { SimpleEditorModule } from './simple-editor/editor.module';
import { MatCardModule } from '@angular/material';
import { TestSetComponent } from './test-set/test-set.component';
import { AstProgressBarComponent } from './progress-bar/progress-bar.component';
import { CommonModule } from '@angular/common';
import { SizePickerComponent } from './size-picker/size-picker.component';
import { SizePickerModule } from './size-picker/size-picker.module';


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
    BrowserWindowModule,
    FeedbackModule,
    SimpleEditorModule,
    FlexLayoutModule,
    FormsModule,
    RunnersModule,
    TooltipsModule,
    SizePickerModule,
    MatCardModule,
    FakeBabelModule,
  ],
  declarations: [
    AstComponent,
    MatchTypesOnHoverDirective,
    SimpleHighlightDirective,
    DebuggerComponent,
    TestSetComponent,
    AstProgressBarComponent
  ],
  exports: [AstComponent]
})
export class AstModule {

}
