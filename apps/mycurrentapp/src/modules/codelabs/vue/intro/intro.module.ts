import { NgModule } from '@angular/core';
import { IntroComponent } from './intro.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@mycurrentapp/presentation/src/slide-routes';

import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from '@mycurrentapp/presentation/src/presentation.module';
import { FeedbackModule } from '@mycurrentapp/feedback/src/feedback.module';
import { BrowserWindowModule } from '@mycurrentapp/browser-window/src/browser-window.module';

const routes = RouterModule.forChild(SlidesRoutes.get(IntroComponent));

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, BrowserWindowModule, FeedbackModule],
  declarations: [IntroComponent],
  exports: [IntroComponent]
})
export class VueModule {}
