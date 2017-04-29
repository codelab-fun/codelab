import {NgModule} from '@angular/core';
import {TypescriptComponent} from './typescript.component';
import {RouterModule} from '@angular/router';
import {SlidesRoutes} from '../../presentation/slide-routes';
import {ExerciseModule} from '../../exercise/exersice.module';
import {PresentationModule} from 'app/presentation/presentation.module';
import {FeedbackModule} from "../../feedback/feedback.module";


const routes = RouterModule.forChild(
  SlidesRoutes.get(TypescriptComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, FeedbackModule],
  declarations: [TypescriptComponent],
  exports: [TypescriptComponent]
})
export class TypescriptModule {

}
