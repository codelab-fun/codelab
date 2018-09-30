import { NgModule } from '@angular/core';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { ExerciseModule } from '../../../exercise/exercise.module';

import { FeedbackModule } from '../../../feedback/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { RouterModule } from '@angular/router';
import { FormsComponent } from './forms.component';
import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';

const routes = RouterModule.forChild(
  [
    {
      path: '',
      redirectTo: '/forms/intro',
      pathMatch: 'full'
    }, ...SlidesRoutes.get(FormsComponent)
  ]
);

@NgModule({
  imports: [
    routes, PresentationModule, ExerciseModule, FeedbackModule, CommonModule, BrowserWindowModule, RunnersModule
  ],
  declarations: [FormsComponent],
  exports: [FormsComponent],
  providers: [Ng2TsExercises],
})
export class FormsCodelabModule {
}
