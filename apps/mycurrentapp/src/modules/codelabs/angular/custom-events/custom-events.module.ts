import { CustomEventsComponent } from './custom-events.component';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@mycurrentapp/presentation/src/slide-routes';
import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from '@mycurrentapp/presentation/src/presentation.module';
import { FeedbackModule } from '@mycurrentapp/feedback/src/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '@mycurrentapp/browser-window/src/browser-window.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';

const routes = RouterModule.forChild([
  {
    path: '',
    redirectTo: '/custom-events/intro',
    pathMatch: 'full'
  },
  ...SlidesRoutes.get(CustomEventsComponent)
]);

@NgModule({
  imports: [
    routes,
    PresentationModule,
    ExerciseModule,
    FeedbackModule,
    CommonModule,
    BrowserWindowModule,
    RunnersModule
  ],
  declarations: [CustomEventsComponent],
  exports: [CustomEventsComponent]
})
export class CustomEventsModule {}
