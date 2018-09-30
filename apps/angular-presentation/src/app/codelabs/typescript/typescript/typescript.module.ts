import { NgModule } from '@angular/core';
import { TypescriptComponent } from './typescript.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';
import { ExerciseModule } from '../../../exercise/exercise.module';

import { FeedbackModule } from '../../../feedback/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '../../../browser/browser.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { PresentationModule } from '../../../presentation/presentation.module';

const routes = RouterModule.forChild(
  [
    {
      path: '',
      redirectTo: '/typescript/intro',
      pathMatch: 'full'
    }, ...SlidesRoutes.get(TypescriptComponent)
  ]
);

@NgModule({
  imports: [
    routes, PresentationModule, ExerciseModule, FeedbackModule, CommonModule, BrowserWindowModule, RunnersModule
  ],
  declarations: [TypescriptComponent],
  exports: [TypescriptComponent]
})
export class TypescriptModule {

}
