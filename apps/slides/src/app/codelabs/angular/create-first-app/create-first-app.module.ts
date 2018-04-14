import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/slides/src/slide-routes';
import { SlidesModule } from '../../../../../../../libs/slides/src/slides.module';
import { ExerciseModule } from '../../../exercise/exercise.module';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { CommonModule } from '@angular/common';
import { CreateFirstAppComponent } from './create-first-app.component';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { BrowserWindowModule } from '../../../browser/browser.module';

const routes = RouterModule.forChild(
  [{
    path: '',
    redirectTo: '/create-first-app/intro',
    pathMatch: 'full'
  }, ...SlidesRoutes.get(CreateFirstAppComponent)]
);

@NgModule({
  imports: [routes, SlidesModule, ExerciseModule, FeedbackModule, CommonModule,
            RunnersModule, BrowserWindowModule],
  declarations: [CreateFirstAppComponent],
  exports: [CreateFirstAppComponent]
})
export class CreateFirstAppModule {

}
