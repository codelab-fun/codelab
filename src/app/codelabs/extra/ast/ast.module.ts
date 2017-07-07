import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';

import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from '../../../presentation/presentation.module';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { BrowserWindowModule } from '../../../browser/browser.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { AstComponent } from './ast.component';


const routes = RouterModule.forChild(
  SlidesRoutes.get(AstComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, BrowserWindowModule, FeedbackModule, RunnersModule],
  declarations: [AstComponent],
  exports: [AstComponent]
})
export class AstModule {

}
