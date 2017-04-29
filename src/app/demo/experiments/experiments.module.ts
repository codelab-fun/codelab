import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {SlidesRoutes} from '../../presentation/slide-routes';

import {ExperimentsComponent} from './experiments.component';
import {PresentationModule} from '../../presentation/presentation.module';
import {FeedbackModule} from "../../feedback/feedback.module";


const routes = RouterModule.forChild(
  SlidesRoutes.get(ExperimentsComponent)
);

@NgModule({
  imports: [routes, PresentationModule, FeedbackModule],
  declarations: [ExperimentsComponent],
  exports: [ExperimentsComponent]
})
export class ExperimentsModule {

}
