import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { QuizComponent } from './quiz.component';
import { PresentationModule } from '../../../presentation/presentation.module';
import { ExerciseModule } from '../../../exercise/exercise.module';

const routes = RouterModule.forChild(
  SlidesRoutes.get(QuizComponent)
);

@NgModule({
  imports: [routes, PresentationModule, FeedbackModule, ExerciseModule],
  declarations: [QuizComponent],
  exports: [QuizComponent]
})
export class QuizModule {

}
