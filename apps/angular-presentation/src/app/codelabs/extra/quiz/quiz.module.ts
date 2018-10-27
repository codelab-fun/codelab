import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { QuizComponent } from './quiz.component';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';
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
