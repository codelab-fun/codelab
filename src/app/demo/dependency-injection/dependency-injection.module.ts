///<reference path='../../presentation/presentation.module.ts'/>
import {DependencyInjectionComponent} from './dependency-injection.component';
import {ExerciseModule} from '../../exercise/exersice.module';
import {FeedbackModule} from '../../feedback/feedback.module';
import {NgModule} from '@angular/core';
import {Ng2TsExercises} from '../../../../ng2ts/ng2ts';
import {PresentationModule} from '../../presentation/presentation.module';
import {RouterModule} from '@angular/router';
import {SlidesRoutes} from '../../presentation/slide-routes';


const routes = RouterModule.forChild(
  SlidesRoutes.get(DependencyInjectionComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule,FeedbackModule],
  providers: [Ng2TsExercises],
  declarations: [DependencyInjectionComponent],
  exports: [DependencyInjectionComponent]
})
export class DependencyInjectionModule {

}

