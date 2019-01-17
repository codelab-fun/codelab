import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { TemplatesComponent } from './templates.component';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';

import { CodelabComponentsModule } from '../../components/codelab-components.module';
import { SlidesModule } from '../../../../../../../libs/slides/src';
import { SimpleEditorModule } from '../../../../../../../libs/code-demos/src/lib/editor/simple-editor.module';
import { FormsModule } from '@angular/forms';
import { CodeDemoModule } from '../../../../../../../libs/code-demos/src';

const routes = RouterModule.forChild(
  [
    {
      path: '',
      redirectTo: '/templates/intro',
      pathMatch: 'full'
    }, ...SlidesRoutes.get(TemplatesComponent)
  ]
);

@NgModule({
  imports: [
    routes,
    PresentationModule,
    CodeDemoModule,
    FeedbackModule,
    CodelabComponentsModule,
    SimpleEditorModule,
    SlidesModule,
    FormsModule,
  ],
  declarations: [TemplatesComponent],
  exports: [TemplatesComponent]
})
export class TemplatesModule {

}
