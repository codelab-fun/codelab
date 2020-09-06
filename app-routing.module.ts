import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { IntroductionComponent } from './containers/introduction/introduction.component';
import { QuestionComponent } from './containers/question/question.component';
import { ResultsComponent } from './containers/results/results.component';

const routes: Route[] = [
  { path: 'intro', component: IntroductionComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'question/:index', component: QuestionComponent },
  { path: 'results', component: ResultsComponent },
  { path: '', redirectTo: 'intro' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
