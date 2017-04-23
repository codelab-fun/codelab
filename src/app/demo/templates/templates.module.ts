import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {SlidesRoutes} from '../../presentation/slide-routes';
import {PresentationModule} from '../../presentation.module';
import {TemplatesComponent} from './templates.component';
import {ExerciseModule} from '../../exercise/exersice.module';

const routes = RouterModule.forChild(
  SlidesRoutes.get(TemplatesComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule],
  declarations: [TemplatesComponent],
  exports: [TemplatesComponent]
})
export class TemplatesModule {

}
