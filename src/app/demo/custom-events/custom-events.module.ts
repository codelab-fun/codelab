import { CustomEventsComponent } from './custom-events.component';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../presentation/slide-routes';
import { ExerciseModule } from '../../exercise/exercise.module';
import { PresentationModule } from 'app/presentation/presentation.module';
import { FeedbackModule } from '../../feedback/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '../../browser/browser.module';

const routes = RouterModule.forChild(
  [{
    path: '',
    redirectTo: '/custom-events/intro',
    pathMatch: 'full'
  }, ...SlidesRoutes.get(CustomEventsComponent)]
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, FeedbackModule, CommonModule, BrowserModule],
  declarations: [CustomEventsComponent],
  exports: [CustomEventsComponent]
})
export class CustomEventsModule { }
