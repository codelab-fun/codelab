import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@mycurrentapp/presentation/src/slide-routes';
import { FeedbackModule } from '@mycurrentapp/feedback/src/feedback.module';
import { ExperimentsComponent } from './experiments.component';
import { PresentationModule } from '@mycurrentapp/presentation/src/presentation.module';
import { ExerciseModule } from '../../../exercise/exercise.module';

const routes = RouterModule.forChild(SlidesRoutes.get(ExperimentsComponent));

@NgModule({
  imports: [routes, PresentationModule, FeedbackModule, ExerciseModule],
  declarations: [ExperimentsComponent],
  exports: [ExperimentsComponent]
})
export class ExperimentsModule {}
