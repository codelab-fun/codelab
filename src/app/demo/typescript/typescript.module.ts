import {NgModule} from '@angular/core';
import {TypescriptComponent} from './typescript.component';
import {RouterModule} from '@angular/router';
import {SlidesRoutes} from '../../presentation/slide-routes';
import {ExerciseModule} from '../../exercise/exersice.module';
import {PresentationModule} from 'app/presentation/presentation.module';

import {TypescriptCirclesModule} from './typescript-circles/typescript-circles.module';

const routes = RouterModule.forChild(
  SlidesRoutes.get(TypescriptComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, TypescriptCirclesModule],
  declarations: [TypescriptComponent],
  exports: [TypescriptComponent]
})
export class TypescriptModule {

}
