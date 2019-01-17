import { NgModule } from '@angular/core';
import { ComponentTreeComponent } from './component-tree.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';
import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';

import { CodelabComponentsModule } from '../../components/codelab-components.module';
import { SimpleEditorModule } from '../../../../../../../libs/code-demos/src/lib/editor/simple-editor.module';
import { SlidesModule } from '../../../../../../../libs/slides/src';
import { FormsModule } from '@angular/forms';
import { CodeDemoModule } from '../../../../../../../libs/code-demos/src';

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
    CodeDemoModule,
    FeedbackModule,
    CodelabComponentsModule,
    SimpleEditorModule,
    SlidesModule,
    FormsModule,
  ],
  providers: [Ng2TsExercises],
  declarations: [ComponentTreeComponent],
  exports: [ComponentTreeComponent]
})
export class ComponentTreeModule {

}
