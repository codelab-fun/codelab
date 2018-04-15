import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { TemplatesComponent } from './templates.component';
import { SlidesRoutes } from '../../../../../libs/slides/src/slide-routes';
import { SlidesModule } from '../../../../../libs/slides/src/slides.module';
import { ExerciseModule } from '../../../../../libs/exercise/src/exercise.module';
import { FeedbackModule } from '../../../../../libs/feedback/src/feedback.module';
import { RunnersModule } from '../../../../../libs/exercise/src/runners/runners.module';

const routes = RouterModule.forChild(
  [{
    path: '',
    redirectTo: '/templates/intro',
    pathMatch: 'full'
  }, ...SlidesRoutes.get(TemplatesComponent)]
);

@NgModule({
  imports: [routes, SlidesModule, ExerciseModule, FeedbackModule, RunnersModule],
  declarations: [TemplatesComponent],
  exports: [TemplatesComponent]
})
export class TemplatesModule {

}
