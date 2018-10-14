import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';

import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';
import { StructuralDirectivesComponent } from './structural-directives.component';
import { RunnersModule } from '../../../exercise/runners/runners.module';


const routes = RouterModule.forChild(
  SlidesRoutes.get(StructuralDirectivesComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, BrowserWindowModule, FeedbackModule, RunnersModule],
  declarations: [StructuralDirectivesComponent],
  exports: [StructuralDirectivesComponent]
})
export class StructuralDirectivesModule {

}
