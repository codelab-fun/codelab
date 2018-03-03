import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@mycurrentapp/presentation/src/slide-routes';

import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from '@mycurrentapp/presentation/src/presentation.module';
import { FeedbackModule } from '@mycurrentapp/feedback/src/feedback.module';
import { BrowserWindowModule } from '@mycurrentapp/browser-window/src/browser-window.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { AstComponent } from './ast.component';
import { TooltipsModule } from '@mycurrentapp/tool-tips/src/tooltips.module';
import { MatchTypesOnHoverDirective } from './match-types-on-hover.directive';
import { FakeBabelModule } from '../../../exercise/fake-babel-runner/fake-babel-runner.model';

const routes = RouterModule.forChild(SlidesRoutes.get(AstComponent));

@NgModule({
  imports: [
    routes,
    PresentationModule,
    ExerciseModule,
    BrowserWindowModule,
    FeedbackModule,
    RunnersModule,
    TooltipsModule,
    FakeBabelModule
  ],
  declarations: [AstComponent, MatchTypesOnHoverDirective],
  exports: [AstComponent]
})
export class AstModule {}
