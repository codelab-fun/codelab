import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroductionComponent } from '@quiz/containers/introduction/introduction.component';
import { DependencyInjectionQuizComponent } from '@quiz/containers/dependency-injection-quiz/dependency-injection-quiz.component';
import { ResultsComponent } from '@quiz/containers/results/results.component';

const routes: Routes = [
  { path: '', redirectTo: 'intro' },
  { path: 'intro', component: IntroductionComponent },
  { path: 'question', component: DependencyInjectionQuizComponent },
  { path: 'question/:questionIndex', component: DependencyInjectionQuizComponent },
  { path: 'results', component: ResultsComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule {}
