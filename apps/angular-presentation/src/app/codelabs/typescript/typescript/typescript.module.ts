import { NgModule } from '@angular/core';
import { TypescriptComponent } from './typescript.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { ExerciseModule } from '../../../../../../../libs/exercise/src/lib/exercise.module';

import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';
import { RunnersModule } from '../../../../../../../libs/exercise/src/lib/runners/runners.module';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';
import { CodeDemosModule } from '../../../../../../../libs/code-demos/src';
import { FormsModule } from '@angular/forms';

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
    routes,
    PresentationModule,
    ExerciseModule,
    FeedbackModule,
    CodeDemosModule,
    CommonModule,
    FormsModule,
    BrowserWindowModule,
    RunnersModule
  ],
  declarations: [TypescriptComponent],
  exports: [TypescriptComponent]
})
export class TypescriptModule {

}
