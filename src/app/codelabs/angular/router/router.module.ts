import { RouterComponent } from './router.component';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';
import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from 'app/presentation/presentation.module';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '../../../browser/browser.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { Ng2TsExercises } from '../../../../../ng2ts/ng2ts';

const routes = RouterModule.forChild(
  [{
    path: '',
    redirectTo: '/router/intro',
    pathMatch: 'full'
  }, ...SlidesRoutes.get(RouterComponent)]
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, FeedbackModule, CommonModule, BrowserWindowModule, RunnersModule],
  declarations: [RouterComponent],
  providers: [Ng2TsExercises],
  exports: [RouterComponent]
})
export class RouterCodelabModule {
}
