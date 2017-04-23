import {NgModule} from '@angular/core';
import {DependencyInjectionComponent} from './dependency-injection.component';
import {RouterModule} from '@angular/router';
import {SlidesRoutes} from '../../presentation/slide-routes';
import {PresentationModule} from '../../presentation.module';
import {ExerciseModule} from '../../exercise/exersice.module';


const routes = RouterModule.forChild(
  SlidesRoutes.get(DependencyInjectionComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule],
  declarations: [DependencyInjectionComponent],
  exports: [DependencyInjectionComponent]
})
export class DependencyInjectionModule {

}

