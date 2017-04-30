import {NgModule} from '@angular/core';
import {DependencyInjectionComponent} from './dependency-injection.component';
import {RouterModule} from '@angular/router';
import {SlidesRoutes} from '../../presentation/slide-routes';
import {FeedbackModule} from "../../feedback/feedback.module";
import {ExerciseModule} from '../../exercise/exersice.module';
import {PresentationModule} from '../../presentation/presentation.module';
<<<<<<< HEAD
import {FeedbackModule} from "../../feedback/feedback.module";
=======
import {Ng2TsExercises} from '../../../../ng2ts/ng2ts';
>>>>>>> master


const routes = RouterModule.forChild(
  SlidesRoutes.get(DependencyInjectionComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, FeedbackModule],
<<<<<<< HEAD
=======
  providers: [Ng2TsExercises],
>>>>>>> master
  declarations: [DependencyInjectionComponent],
  exports: [DependencyInjectionComponent]
})
export class DependencyInjectionModule {

}

