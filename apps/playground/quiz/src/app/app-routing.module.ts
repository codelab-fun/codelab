import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { IntroductionComponent } from './containers/introduction/introduction.component';
import { QuestionComponent } from './containers/question/question.component';
import { ResultsComponent } from './containers/results/results.component';

const routes: Route[] = [
  { path: 'intro', component: IntroductionComponent, pathMatch: 'full' },
  { path: 'question', component: QuestionComponent, pathMatch: 'full' },
  { path: 'question/:questionId', component: QuestionComponent, pathMatch: 'full' },
  { path: 'results', component: ResultsComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'intro', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
