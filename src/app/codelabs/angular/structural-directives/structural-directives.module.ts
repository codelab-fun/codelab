import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';

import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from '../../../presentation/presentation.module';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { BrowserModule } from '../../../browser/browser.module';
import { StructuralDirectivesComponent } from './structural-directives.component';


const routes = RouterModule.forChild(
  SlidesRoutes.get(StructuralDirectivesComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, BrowserModule, FeedbackModule],
  declarations: [StructuralDirectivesComponent],
  exports: [StructuralDirectivesComponent]
})
export class StructuralDirectivesModule {

}
