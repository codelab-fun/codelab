import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@mycurrentapp/presentation/src/slide-routes';

import { ExerciseModule } from '../../../exercise/exercise.module';

import { FeedbackModule } from '@mycurrentapp/feedback/src/feedback.module';
import { BrowserWindowModule } from '@mycurrentapp/browser-window/src/browser-window.module';
import { StructuralDirectivesComponent } from './structural-directives.component';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { PresentationModule } from '@mycurrentapp/presentation/src/presentation.module';

const routes = RouterModule.forChild(SlidesRoutes.get(StructuralDirectivesComponent));

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, BrowserWindowModule, FeedbackModule, RunnersModule],
  declarations: [StructuralDirectivesComponent],
  exports: [StructuralDirectivesComponent]
})
export class StructuralDirectivesModule {}
