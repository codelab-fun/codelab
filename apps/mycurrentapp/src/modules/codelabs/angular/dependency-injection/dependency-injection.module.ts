import { NgModule } from '@angular/core';
import { DependencyInjectionComponent } from './dependency-injection.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@mycurrentapp/presentation/src/slide-routes';
import { FeedbackModule } from '@mycurrentapp/feedback/src/feedback.module';
import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from '@mycurrentapp/presentation/src/presentation.module';
import { Ng2TsExercises } from '@mycurrentapp/ng2ts/src/ng2ts';
import { BrowserWindowModule } from '@mycurrentapp/browser-window/src/browser-window.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';

const routes = RouterModule.forChild([
  {
    path: '',
    redirectTo: '/dependency-injection/intro',
    pathMatch: 'full'
  },
  ...SlidesRoutes.get(DependencyInjectionComponent)
]);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, FeedbackModule, BrowserWindowModule, RunnersModule],
  providers: [Ng2TsExercises],
  declarations: [DependencyInjectionComponent],
  exports: [DependencyInjectionComponent]
})
export class DependencyInjectionModule {}
