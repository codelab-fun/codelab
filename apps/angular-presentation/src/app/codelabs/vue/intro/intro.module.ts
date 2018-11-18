import { NgModule } from '@angular/core';
import { IntroComponent } from './intro.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';

import { ExerciseModule } from '../../../../../../../libs/exercise/src/lib/exercise.module';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';


const routes = RouterModule.forChild(
  SlidesRoutes.get(IntroComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, BrowserWindowModule, FeedbackModule],
  declarations: [IntroComponent],
  exports: [IntroComponent]
})
export class VueModule {

}
