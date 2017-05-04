import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {SlidesRoutes} from '../../presentation/slide-routes';
import {SlidesTemplatesComponent} from './slides-templates.component';
import {ExerciseModule} from '../../exercise/exercise.module';
import {PresentationModule} from '../../presentation/presentation.module';
import {FeedbackModule} from '../../feedback/feedback.module';
import {BrowserWindowModule} from '../../browser-window/browser-window.module';

const routes = RouterModule.forChild(
  SlidesRoutes.get(SlidesTemplatesComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, FeedbackModule, BrowserWindowModule],
  declarations: [SlidesTemplatesComponent],
  exports: [SlidesTemplatesComponent]
})
export class SlidesTemplatesModule {

}
