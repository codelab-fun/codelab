import { NgModule } from '@angular/core';
import { IntroductionComponent } from './introduction/introduction.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../presentation/slide-routes';

import { ExerciseModule } from '../../exercise/exercise.module';
import { PresentationModule } from '../../presentation/presentation.module';
import { FeedbackModule } from '../../feedback/feedback.module';
import { BrowserModule } from '../../browser/browser.module';


const routes = RouterModule.forChild(
  SlidesRoutes.get(IntroductionComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, BrowserModule, FeedbackModule],
  declarations: [IntroductionComponent],
  exports: [IntroductionComponent]
})
export class ReactModule {

}
