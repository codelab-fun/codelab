import { AngularCliComponent } from './angular-cli.component';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../libs/slides/src/slide-routes';
import { ExerciseModule } from '../../../../../libs/exercise/src/exercise.module';
import { SlidesModule } from '../../../../../libs/slides/src/slides.module';
import { FeedbackModule } from '../../../../../libs/feedback/src/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '../../../../../libs/browser-window/src/browser-window.module';
import { RunnersModule } from '../../../../../libs/exercise/src/runners/runners.module';

const routes = RouterModule.forChild(
  [{
    path: '',
    redirectTo: '/angular-cli/intro',
    pathMatch: 'full'
  }, ...SlidesRoutes.get(AngularCliComponent)]
);

@NgModule({
  imports: [routes, SlidesModule, ExerciseModule, FeedbackModule, CommonModule, BrowserWindowModule, RunnersModule],
  declarations: [AngularCliComponent],
  exports: [AngularCliComponent]
})
export class AngularCliModule {
}