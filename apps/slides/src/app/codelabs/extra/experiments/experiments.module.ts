import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/slides/src/slide-routes';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/feedback.module';
import { ExperimentsComponent } from './experiments.component';
import { SlidesModule } from '../../../../../../../libs/slides/src/slides.module';
import { ExerciseModule } from '../../../exercise/exercise.module';

const routes = RouterModule.forChild(
  SlidesRoutes.get(ExperimentsComponent)
);

@NgModule({
  imports: [routes, SlidesModule, FeedbackModule, ExerciseModule],
  declarations: [ExperimentsComponent],
  exports: [ExperimentsComponent]
})
export class ExperimentsModule {

}
