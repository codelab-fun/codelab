import { AngularCliComponent } from './angular-cli.component';
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
