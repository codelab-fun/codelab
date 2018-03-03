import { NgModule } from '@angular/core';
import { ComponentTreeComponent } from './component-tree.component';
import { RouterModule } from '@angular/router';
import { BrowserWindowModule } from '@mycurrentapp/browser-window';
import { SlidesRoutes } from '@mycurrentapp/presentation/src/slide-routes';
import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from '@mycurrentapp/presentation/src/presentation.module';
import { FeedbackModule } from '@mycurrentapp/feedback/src/feedback.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { Ng2TsExercises } from '@mycurrentapp/ng2ts/src/ng2ts';

const routes = RouterModule.forChild([
  {
    path: '',
    redirectTo: '/component-tree/intro',
    pathMatch: 'full'
  },
  ...SlidesRoutes.get(ComponentTreeComponent)
]);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, BrowserWindowModule, RunnersModule, FeedbackModule],
  providers: [Ng2TsExercises],
  declarations: [ComponentTreeComponent],
  exports: [ComponentTreeComponent]
})
export class ComponentTreeModule {}
