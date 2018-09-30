import { NgModule } from '@angular/core';
import { PipesComponent } from './pipes.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';

import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from '../../../presentation/presentation.module';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { BrowserWindowModule } from '../../../browser/browser.module';


const routes = RouterModule.forChild(
  SlidesRoutes.get(PipesComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, BrowserWindowModule, FeedbackModule],
  declarations: [PipesComponent],
  exports: [PipesComponent]
})
export class PipesModule {

}
