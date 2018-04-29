import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@slides/slides/src/slide-routes';

import { ExerciseModule } from '@slides/exercise';
import { SlidesModule } from '@slides/slides';
import { FeedbackModule } from '@slides/feedback';
import { BrowserWindowModule } from '@slides/browser-window';
import { RunnersModule } from '@slides/exercise/src/runners/runners.module';
import { AstComponent } from './ast.component';

import { MatchTypesOnHoverDirective } from './match-types-on-hover.directive';
import { FakeBabelModule } from '@slides/exercise/src/fake-babel-runner/fake-babel-runner.model';
import { AstPreviewRunnerModule } from './ast-preview-runner/ast-preview-runner.module';
import { FormsModule } from '@angular/forms';
import { SimpleHighlightDirective } from './simple-editor/simple-highlight.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DebuggerComponent } from './debugger/debugger.component';
import { SimpleEditorModule } from './simple-editor/editor.module';
import { TooltipsModule } from '../../old-slides/src/app/tooltips/tooltips.module';


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
