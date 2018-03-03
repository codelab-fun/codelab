import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@mycurrentapp/presentation/src/slide-routes';
import { PresentationModule } from '@mycurrentapp/presentation/src/presentation.module';
import { ExerciseModule } from '../../../exercise/exercise.module';
import { FeedbackModule } from '@mycurrentapp/feedback/src/feedback.module';
import { CommonModule } from '@angular/common';
import { CreateFirstAppComponent } from './create-first-app.component';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { BrowserWindowModule } from '@mycurrentapp/browser-window/src/browser-window.module';

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
