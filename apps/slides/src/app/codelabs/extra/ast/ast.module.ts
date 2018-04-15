import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/slides/src/slide-routes';

import { ExerciseModule } from '../../../exercise/exercise.module';
import { SlidesModule } from '../../../../../../../libs/slides/src/slides.module';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { BrowserWindowModule } from '../../../../../../../libs/browser-window/src/browser-window.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { AstComponent } from './ast.component';
import { TooltipsModule } from '../../../tooltips/tooltips.module';
import { MatchTypesOnHoverDirective } from './match-types-on-hover.directive';
import { FakeBabelModule } from '../../../exercise/fake-babel-runner/fake-babel-runner.model';
import { AstPreviewRunnerModule } from './ast-preview-runner/ast-preview-runner.module';
import { FormsModule } from '@angular/forms';
import { SimpleHighlightDirective } from './simple-editor/simple-highlight.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DebuggerComponent } from './debugger/debugger.component';
import { SimpleEditorModule } from './simple-editor/editor.module';


const routes = RouterModule.forChild(
  SlidesRoutes.get(AstComponent)
);

@NgModule({
  imports: [
    routes,
    AstPreviewRunnerModule,
    SlidesModule,
    ExerciseModule,
    BrowserWindowModule,
    FeedbackModule,
    SimpleEditorModule,
    FlexLayoutModule,
    FormsModule,
    RunnersModule,
    TooltipsModule,
    FakeBabelModule,
  ],
  declarations: [
    AstComponent,
    MatchTypesOnHoverDirective,
    SimpleHighlightDirective,
    DebuggerComponent
  ],
  exports: [AstComponent]
})
export class AstModule {

}
