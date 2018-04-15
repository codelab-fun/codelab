import { NgModule } from '@angular/core';
import { DependencyInjectionComponent } from './dependency-injection.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../libs/slides/src/slide-routes';
import { FeedbackModule } from '../../../../../libs/feedback/src/feedback.module';
import { ExerciseModule } from '../../../../slides/src/app/exercise/exercise.module';
import { SlidesModule } from '../../../../../libs/slides/src/slides.module';
import { Ng2TsExercises } from '../../../../../ng2ts/ng2ts';
import { BrowserWindowModule } from '../../../../../libs/browser-window/src/browser-window.module';
import { RunnersModule } from '../../../../slides/src/app/exercise/runners/runners.module';

const routes = RouterModule.forChild(
  [{
    path: '',
    redirectTo: '/dependency-injection/intro',
    pathMatch: 'full'
  }, ...SlidesRoutes.get(DependencyInjectionComponent)]
);

@NgModule({
  imports: [routes, SlidesModule, ExerciseModule, FeedbackModule, BrowserWindowModule, RunnersModule],
  providers: [Ng2TsExercises],
  declarations: [DependencyInjectionComponent],
  exports: [DependencyInjectionComponent]
})
export class DependencyInjectionModule {

}

