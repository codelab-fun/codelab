import {NgModule} from '@angular/core';
import {TypescriptComponent} from './typescript.component';
import {RouterModule} from '@angular/router';
import {SlidesRoutes} from '../../presentation/slide-routes';
import {ExerciseModule} from '../../exercise/exersice.module';
import {PresentationModule} from 'app/presentation/presentation.module';
<<<<<<< HEAD
import {FeedbackModule} from "../../feedback/feedback.module";
=======
import {FeedbackModule} from '../../feedback/feedback.module';
import {CommonModule} from '@angular/common';
>>>>>>> master


const routes = RouterModule.forChild(
  SlidesRoutes.get(TypescriptComponent)
);

@NgModule({
<<<<<<< HEAD
  imports: [routes, PresentationModule, ExerciseModule, FeedbackModule],
=======
  imports: [routes, PresentationModule, ExerciseModule, FeedbackModule, CommonModule],
>>>>>>> master
  declarations: [TypescriptComponent],
  exports: [TypescriptComponent]
})
export class TypescriptModule {

}
