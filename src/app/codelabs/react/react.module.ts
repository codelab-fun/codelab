import { NgModule } from '@angular/core';
import { ReactComponent } from './react.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../presentation/slide-routes';

import { ExerciseModule } from '../../exercise/exercise.module';
import { PresentationModule } from '../../presentation/presentation.module';
import { FeedbackModule } from '../../feedback/feedback.module';
import { BrowserModule } from '../../browser/browser.module';


const routes = RouterModule.forChild(
  SlidesRoutes.get(ReactComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, BrowserModule, FeedbackModule],
  declarations: [ReactComponent],
  exports: [ReactComponent]
})
export class ReactModule {

}
