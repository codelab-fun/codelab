import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';
import { PresentationModule } from '../../../presentation/presentation.module';
import { ExerciseModule } from '../../../exercise/exercise.module';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/feedback.module';
import { CommonModule } from '@angular/common';
import { CreateFirstAppComponent } from './create-first-app.component';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { BrowserWindowModule } from '../../../../../../../libs/browser-window/src/browser-window.module';

const routes = RouterModule.forChild([
  {
    path: '',
    redirectTo: '/create-first-modules/intro',
    pathMatch: 'full'
  },
  ...SlidesRoutes.get(CreateFirstAppComponent)
]);

@NgModule({
  imports: [
    routes,
    PresentationModule,
    ExerciseModule,
    FeedbackModule,
    CommonModule,
    RunnersModule,
    BrowserWindowModule
  ],
  declarations: [CreateFirstAppComponent],
  exports: [CreateFirstAppComponent]
})
export class CreateFirstAppModule {}
