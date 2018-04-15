import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@slides/slides/src/slide-routes';


import { FeedbackModule } from '@slides/feedback';
import { BrowserWindowModule } from '@slides/browser-window';
import { StructuralDirectivesComponent } from './structural-directives.component';
import { RunnersModule } from '../../../../../libs/exercise/src/runners/runners.module';
import { SlidesModule } from '@slides/slides';
import { ExerciseModule } from '../../../../../libs/exercise/src/exercise.module';


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
