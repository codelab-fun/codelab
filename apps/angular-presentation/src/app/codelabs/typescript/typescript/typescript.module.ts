import { NgModule } from '@angular/core';
import { TypescriptComponent } from './typescript.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { ExerciseModule } from '../../../../../../../libs/exercise/src/lib/exercise.module';

import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';

import { CodeDemosModule } from '../../../../../../../libs/code-demos/src';
import { FormsModule } from '@angular/forms';
import { CodelabExerciseModule } from '../../components/exercise.module';
import { SlidesModule } from '../../../../../../../libs/slides/src';
import { SimpleEditorModule } from '../../../../../../../libs/code-demos/src/lib/editor/simple-editor.module';
import { TypescriptSvgComponent } from './typescript-svg/typescript-svg.component';
import { TreeDescriptionSvgComponent } from './tree-description-svg';
import { PresentationModule } from '../../../../../../../libs/presentation/src';

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

    CodelabExerciseModule,
    FormsModule,
    SimpleEditorModule,
    PresentationModule,
  ],
  declarations: [
    TypescriptComponent,
    TypescriptSvgComponent,
    TreeDescriptionSvgComponent
  ],
  exports: [TypescriptComponent]
})
export class TypescriptModule {

}
