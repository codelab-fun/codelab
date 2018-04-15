import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@slides/slides/src/slide-routes';


import { FeedbackModule } from '../../../../slides/src/app/feedback/feedback.module';
import { BrowserWindowModule } from '../../../../../libs/browser-window/src/browser-window.module';
import { StructuralDirectivesComponent } from './structural-directives.component';
import { RunnersModule } from '../../../../slides/src/app/exercise/runners/runners.module';
import { SlidesModule } from '@slides/slides';
import { ExerciseModule } from '../../../../slides/src/app/exercise/exercise.module';


const routes = RouterModule.forChild(
  SlidesRoutes.get(StructuralDirectivesComponent)
);

@NgModule({
  imports: [routes, SlidesModule, ExerciseModule, BrowserWindowModule, FeedbackModule, RunnersModule],
  declarations: [StructuralDirectivesComponent],
  exports: [StructuralDirectivesComponent]
})
export class StructuralDirectivesModule {

}
