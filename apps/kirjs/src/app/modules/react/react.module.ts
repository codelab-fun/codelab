import { NgModule } from '@angular/core';
import { ReactComponent } from './react.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@angular-presentation/presentation/src/lib/slide-routes';
import { PresentationModule } from '@angular-presentation/presentation';
import { ExerciseModule } from '../../../../../angular-presentation/src/app/exercise/exercise.module';
import { BrowserWindowModule } from '@angular-presentation/browser';


const routes = RouterModule.forChild(
  SlidesRoutes.get(ReactComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, BrowserWindowModule],
  declarations: [ReactComponent],
  exports: [ReactComponent],
  providers: [

  ]
})
export class ReactModule {

}
