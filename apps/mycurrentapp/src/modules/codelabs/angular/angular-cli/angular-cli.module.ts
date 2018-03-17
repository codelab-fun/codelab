import { AngularCliComponent } from './angular-cli.component';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';
import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from 'modules/presentation/presentation.module';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '../../../../../../../libs/browser-window/src/browser-window.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';

const routes = RouterModule.forChild([
  {
    path: '',
    redirectTo: '/angular-cli/intro',
    pathMatch: 'full'
  },
  ...SlidesRoutes.get(AngularCliComponent)
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
  declarations: [AngularCliComponent],
  exports: [AngularCliComponent]
})
export class AngularCliModule {}
