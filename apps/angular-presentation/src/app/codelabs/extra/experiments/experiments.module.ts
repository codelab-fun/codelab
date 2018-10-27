import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { ExperimentsComponent } from './experiments.component';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';
import { ExerciseModule } from '../../../exercise/exercise.module';

const routes = RouterModule.forChild(
  SlidesRoutes.get(ExperimentsComponent)
);

@NgModule({
  imports: [routes, PresentationModule, FeedbackModule, ExerciseModule],
  declarations: [ExperimentsComponent],
  exports: [ExperimentsComponent]
})
export class ExperimentsModule {

}
