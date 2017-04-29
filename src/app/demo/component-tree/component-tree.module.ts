import {NgModule} from '@angular/core';
import {ComponentTreeComponent} from './component-tree.component';
import {RouterModule} from '@angular/router';
import {SlidesRoutes} from '../../presentation/slide-routes';

import {ExerciseModule} from '../../exercise/exersice.module';
import {PresentationModule} from '../../presentation/presentation.module';
import {BrowserWindowModule} from '../../browser-window/browser-window.module';
import {FeedbackModule} from "../../feedback/feedback.module";

const routes = RouterModule.forChild(
  SlidesRoutes.get(ComponentTreeComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, BrowserWindowModule, FeedbackModule],
  declarations: [ComponentTreeComponent],
  exports: [ComponentTreeComponent]
})
export class ComponentTreeModule {

}
