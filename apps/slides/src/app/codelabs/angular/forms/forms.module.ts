
import { NgModule } from '@angular/core';
import { SlidesRoutes } from '../../../../../../../libs/slides/src/slide-routes';
import { ExerciseModule } from '../../../exercise/exercise.module';
import { SlidesModule } from '../../../../../../../libs/slides/src/slides.module';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '../../../browser/browser.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { RouterModule } from '@angular/router';
import { FormsComponent } from './forms.component';
import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';

const routes = RouterModule.forChild(
  [{
    path: '',
    redirectTo: '/forms/intro',
    pathMatch: 'full'
  }, ...SlidesRoutes.get(FormsComponent)]
);

@NgModule({
  imports: [routes, SlidesModule, ExerciseModule, FeedbackModule, CommonModule, BrowserWindowModule, RunnersModule],
  declarations: [FormsComponent],
  exports: [FormsComponent],
  providers: [Ng2TsExercises],
})
export class FormsCodelabModule {
}
