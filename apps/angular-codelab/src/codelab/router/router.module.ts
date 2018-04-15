import { RouterComponent } from './router.component';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../libs/slides/src/slide-routes';
import { ExerciseModule } from '../../../../slides/src/app/exercise/exercise.module';
import { SlidesModule } from '../../../../../libs/slides/src/slides.module';
import { FeedbackModule } from '../../../../../libs/feedback/src/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '../../../../../libs/browser-window/src/browser-window.module';
import { RunnersModule } from '../../../../slides/src/app/exercise/runners/runners.module';
import { Ng2TsExercises } from '../../../../../ng2ts/ng2ts';

const routes = RouterModule.forChild(
  [{
    path: '',
    redirectTo: '/router/intro',
    pathMatch: 'full'
  }, ...SlidesRoutes.get(RouterComponent)]
);

@NgModule({
  imports: [routes, SlidesModule, ExerciseModule, FeedbackModule, CommonModule, BrowserWindowModule, RunnersModule],
  declarations: [RouterComponent],
  providers: [Ng2TsExercises],
  exports: [RouterComponent]
})
export class RouterCodelabModule {
}
