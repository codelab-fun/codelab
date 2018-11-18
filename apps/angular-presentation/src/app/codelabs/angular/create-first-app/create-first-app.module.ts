import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';
import { ExerciseModule } from '../../../../../../../libs/exercise/src/lib/exercise.module';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { CommonModule } from '@angular/common';
import { CreateFirstAppComponent } from './create-first-app.component';
import { RunnersModule } from '../../../../../../../libs/exercise/src/lib/runners/runners.module';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';

const routes = RouterModule.forChild(
  [{
    path: '',
    redirectTo: '/create-first-app/intro',
    pathMatch: 'full'
  }, ...SlidesRoutes.get(CreateFirstAppComponent)]
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, FeedbackModule, CommonModule,
            RunnersModule, BrowserWindowModule],
  declarations: [CreateFirstAppComponent],
  exports: [CreateFirstAppComponent]
})
export class CreateFirstAppModule {

}
