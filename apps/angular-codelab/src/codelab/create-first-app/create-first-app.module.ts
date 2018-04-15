import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CreateFirstAppComponent } from './create-first-app.component';
import { SlidesRoutes } from '@slides/slides/src/slide-routes';
import { SlidesModule } from '@slides/slides';
import { ExerciseModule } from '../../../../../libs/exercise/src/exercise.module';
import { FeedbackModule } from '../../../../../libs/feedback/src/feedback.module';
import { RunnersModule } from '../../../../../libs/exercise/src/runners/runners.module';
import { BrowserWindowModule } from '../../../../../libs/browser-window/src/browser-window.module';

const routes = RouterModule.forChild(
  [
    {
      path: '',
      redirectTo: '/create-first-app/intro',
      pathMatch: 'full'
    }, ...SlidesRoutes.get(CreateFirstAppComponent)
  ]
);

@NgModule({
  imports: [
    routes, SlidesModule, ExerciseModule, FeedbackModule, CommonModule,
    RunnersModule, BrowserWindowModule
  ],
  declarations: [CreateFirstAppComponent],
  exports: [CreateFirstAppComponent]
})
export class CreateFirstAppModule {
}
