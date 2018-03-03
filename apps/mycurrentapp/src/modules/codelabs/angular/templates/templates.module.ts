import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { TemplatesComponent } from './templates.component';
import { SlidesRoutes } from '@mycurrentapp/presentation/src/slide-routes';
import { PresentationModule } from '@mycurrentapp/presentation/src/presentation.module';
import { ExerciseModule } from '../../../exercise/exercise.module';
import { FeedbackModule } from '@mycurrentapp/feedback/src/feedback.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';

const routes = RouterModule.forChild([
  {
    path: '',
    redirectTo: '/templates/intro',
    pathMatch: 'full'
  },
  ...SlidesRoutes.get(TemplatesComponent)
]);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, FeedbackModule, RunnersModule],
  declarations: [TemplatesComponent],
  exports: [TemplatesComponent]
})
export class TemplatesModule {}
