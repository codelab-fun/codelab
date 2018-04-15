import { NgModule } from '@angular/core';
import { ComponentTreeComponent } from './component-tree.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../libs/slides/src/slide-routes';

import { ExerciseModule } from '../../../../slides/src/app/exercise/exercise.module';
import { SlidesModule } from '../../../../../libs/slides/src/slides.module';
import { FeedbackModule } from '../../../../../libs/feedback/src/feedback.module';
import { BrowserWindowModule } from '../../../../../libs/browser-window/src/browser-window.module';
import { Ng2TsExercises } from '../../../../../ng2ts/ng2ts';
import { RunnersModule } from '../../../../slides/src/app/exercise/runners/runners.module';

const routes = RouterModule.forChild(
  [{
    path: '',
    redirectTo: '/component-tree/intro',
    pathMatch: 'full'
  }, ...SlidesRoutes.get(ComponentTreeComponent)]
);

@NgModule({
  imports: [routes, SlidesModule, ExerciseModule, BrowserWindowModule, RunnersModule, FeedbackModule],
  providers: [Ng2TsExercises],
  declarations: [ComponentTreeComponent],
  exports: [ComponentTreeComponent]
})
export class ComponentTreeModule {

}
