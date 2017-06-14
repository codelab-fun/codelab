import { NgModule } from '@angular/core';
import { VueComponent } from './vue.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../presentation/slide-routes';

import { ExerciseModule } from '../../exercise/exercise.module';
import { PresentationModule } from '../../presentation/presentation.module';
import { FeedbackModule } from '../../feedback/feedback.module';
import { BrowserModule } from '../../browser/browser.module';


const routes = RouterModule.forChild(
  SlidesRoutes.get(VueComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, BrowserModule, FeedbackModule],
  declarations: [VueComponent],
  exports: [VueComponent]
})
export class VueModule {

}
