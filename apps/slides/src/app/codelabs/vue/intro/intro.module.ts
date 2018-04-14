import { NgModule } from '@angular/core';
import { IntroComponent } from './intro.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/slides/src/slide-routes';

import { ExerciseModule } from '../../../exercise/exercise.module';
import { SlidesModule } from '../../../../../../../libs/slides/src/slides.module';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { BrowserWindowModule } from '../../../browser/browser.module';


const routes = RouterModule.forChild(
  SlidesRoutes.get(IntroComponent)
);

@NgModule({
  imports: [routes, SlidesModule, ExerciseModule, BrowserWindowModule, FeedbackModule],
  declarations: [IntroComponent],
  exports: [IntroComponent]
})
export class VueModule {

}
