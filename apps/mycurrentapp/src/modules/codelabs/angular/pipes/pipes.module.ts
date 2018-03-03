import { NgModule } from '@angular/core';
import { PipesComponent } from './pipes.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@mycurrentapp/presentation/src/slide-routes';

import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from '@mycurrentapp/presentation/src/presentation.module';
import { FeedbackModule } from '@mycurrentapp/feedback/src/feedback.module';
import { BrowserWindowModule } from '@mycurrentapp/browser-window/src/browser-window.module';

const routes = RouterModule.forChild(SlidesRoutes.get(PipesComponent));

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, BrowserWindowModule, FeedbackModule],
  declarations: [PipesComponent],
  exports: [PipesComponent]
})
export class PipesModule {}
