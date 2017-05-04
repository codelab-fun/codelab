import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {SlidesRoutes} from '../../presentation/slide-routes';
import {FeedbackModule} from '../../feedback/feedback.module';
import {SlidesExperimentsComponent} from './slides-experiments.component';
import {PresentationModule} from '../../presentation/presentation.module';
import {ExerciseModule} from '../../exercise/exercise.module';


const routes = RouterModule.forChild(
  SlidesRoutes.get(SlidesExperimentsComponent)
);

@NgModule({
  imports: [routes, PresentationModule, FeedbackModule, ExerciseModule],
  declarations: [SlidesExperimentsComponent],
  exports: [SlidesExperimentsComponent]
})
export class SlidesExperimentsModule {

}
