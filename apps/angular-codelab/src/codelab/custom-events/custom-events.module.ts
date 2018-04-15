import { CustomEventsComponent } from './custom-events.component';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@slides/slides/src/slide-routes';
import { ExerciseModule } from '../../../../slides/src/app/exercise/exercise.module';
import { SlidesModule } from '@slides/slides';
import { FeedbackModule } from '@slides/feedback';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '@slides/browser-window';
import { RunnersModule } from '../../../../slides/src/app/exercise/runners/runners.module';

const routes = RouterModule.forChild(
  [
    {
      path: '',
      redirectTo: '/custom-events/intro',
      pathMatch: 'full'
    }, ...SlidesRoutes.get(CustomEventsComponent)
  ]
);

@NgModule({
  imports: [routes, SlidesModule, ExerciseModule, FeedbackModule, CommonModule, BrowserWindowModule, RunnersModule],
  declarations: [CustomEventsComponent],
  exports: [CustomEventsComponent]
})
export class CustomEventsModule {
}
