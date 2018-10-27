import { AngularCliComponent } from './angular-cli.component';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { ExerciseModule } from '../../../exercise/exercise.module';

import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';

const routes = RouterModule.forChild(
  [
    {
      path: '',
      redirectTo: '/angular-cli/intro',
      pathMatch: 'full'
    }, ...SlidesRoutes.get(AngularCliComponent)
  ]
);

@NgModule({
  imports: [
    routes, PresentationModule, ExerciseModule, FeedbackModule, CommonModule, BrowserWindowModule, RunnersModule
  ],
  declarations: [AngularCliComponent],
  exports: [AngularCliComponent]
})
export class AngularCliModule {
}
