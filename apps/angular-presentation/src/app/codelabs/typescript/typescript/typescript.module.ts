import { NgModule } from '@angular/core';
import { TypescriptComponent } from './typescript.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { ExerciseModule } from '../../../../../../../libs/exercise/src/lib/exercise.module';

import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';
import { RunnersModule } from '../../../../../../../libs/exercise/src/lib/runners/runners.module';
import { CodeDemosModule } from '../../../../../../../libs/code-demos/src';
import { FormsModule } from '@angular/forms';
import { CodelabExerciseModule } from '../../components/exercise.module';
import { SlidesModule } from '../../../../../../../libs/slides/src';
import { SimpleEditorModule } from '../../../../../../../libs/code-demos/src/lib/editor/simple-editor.module';
import { TypescriptSvgComponent } from './typescript-svg/typescript-svg.component';

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
    SlidesModule,
    ExerciseModule,
    FeedbackModule,
    CodeDemosModule,
    CommonModule,
    FormsModule,
    BrowserWindowModule,
    RunnersModule,
    CodelabExerciseModule,
    FormsModule,
    SimpleEditorModule,
  ],
  declarations: [TypescriptComponent, TypescriptSvgComponent],
  exports: [TypescriptComponent]
})
export class TypescriptModule {

}
