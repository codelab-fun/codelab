import { NgModule } from '@angular/core';
import { PipesComponent } from './pipes.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../libs/slides/src/slide-routes';

import { ExerciseModule } from '../../../../slides/src/app/exercise/exercise.module';
import { SlidesModule } from '../../../../../libs/slides/src/slides.module';
import { FeedbackModule } from '../../../../slides/src/app/feedback/feedback.module';
import { BrowserWindowModule } from '../../../../../libs/browser-window/src/browser-window.module';


const routes = RouterModule.forChild(
  SlidesRoutes.get(PipesComponent)
);

@NgModule({
  imports: [routes, SlidesModule, ExerciseModule, BrowserWindowModule, FeedbackModule],
  declarations: [PipesComponent],
  exports: [PipesComponent]
})
export class PipesModule {

}
