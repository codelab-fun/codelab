import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroductionComponent } from '@codelab-quiz/containers/introduction/introduction.component';
import { QuizComponent } from '@codelab-quiz/containers/quiz/quiz.component';
import { QuizSelectionComponent } from '@codelab-quiz/containers/quiz-selection/quiz-selection.component';
import { ResultsComponent } from '@codelab-quiz/containers/results/results.component';


const routes: Routes = [
  { path: '', redirectTo: 'select' },
  { path: 'select', component: QuizSelectionComponent },
  { path: 'intro/:quizId', component: IntroductionComponent },
  { path: 'question/:quizId/:questionIndex', component: QuizComponent },
  { path: 'results/:quizId', component: ResultsComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule {}
