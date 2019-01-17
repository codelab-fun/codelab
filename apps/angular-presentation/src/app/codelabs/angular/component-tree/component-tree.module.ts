import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ComponentTreeComponent } from './component-tree.component';
import { ComponentsHierarchySvgComponent } from './components-hierarchy-svg';

import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';
import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';

import { CodelabExerciseModule } from '../../components/exercise.module';
import { SimpleEditorModule } from '../../../../../../../libs/code-demos/src/lib/editor/simple-editor.module';
import { SlidesModule } from '../../../../../../../libs/slides/src';

const routes = RouterModule.forChild(
  [
    {
      path: '',
      redirectTo: '/component-tree/intro',
      pathMatch: 'full'
    }, ...SlidesRoutes.get(ComponentTreeComponent)
  ]
);

@NgModule({
  imports: [
    routes,
    PresentationModule,
    BrowserWindowModule,

    FeedbackModule,
    CodelabExerciseModule,
    SimpleEditorModule,
    SlidesModule,
    FormsModule,
  ],
  providers: [Ng2TsExercises],
  declarations: [
    ComponentTreeComponent,
    ComponentsHierarchySvgComponent
  ],
  exports: [ComponentTreeComponent]
})
export class ComponentTreeModule {

}
