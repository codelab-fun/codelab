import {NgModule} from '@angular/core';
import {DependencyInjectionComponent} from './dependency-injection.component';
import {RouterModule} from '@angular/router';
import {SlidesRoutes} from '../../presentation/slide-routes';
import {FeedbackModule} from '../../feedback/feedback.module';
import {ExerciseModule} from '../../exercise/exercise.module';
import {PresentationModule} from '../../presentation/presentation.module';
import {Ng2TsExercises} from '../../../../ng2ts/ng2ts';
import {BrowserWindowModule} from '../../browser-window/browser-window.module';
import {ClosingSlideComponent} from '../../presentation/closing-slide/closing-slide.component';


const routes = RouterModule.forChild(
  SlidesRoutes.get(DependencyInjectionComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, FeedbackModule, BrowserWindowModule],
  providers: [Ng2TsExercises],
  declarations: [DependencyInjectionComponent, ClosingSlideComponent],
  exports: [DependencyInjectionComponent]
})
export class DependencyInjectionModule {

}

