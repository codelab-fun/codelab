import { NgModule } from '@angular/core';
import { DependencyInjectionComponent } from './dependency-injection.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from '../../../presentation/presentation.module';
import { Ng2TsExercises } from '../../../../../ng2ts/ng2ts';
import { BrowserWindowModule } from '../../../browser/browser.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';

const routes = RouterModule.forChild(
  [{
    path: '',
    redirectTo: '/dependency-injection/intro',
    pathMatch: 'full'
  }, ...SlidesRoutes.get(DependencyInjectionComponent)]
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, FeedbackModule, BrowserWindowModule, RunnersModule],
  providers: [Ng2TsExercises],
  declarations: [DependencyInjectionComponent],
  exports: [DependencyInjectionComponent]
})
export class DependencyInjectionModule {

}

