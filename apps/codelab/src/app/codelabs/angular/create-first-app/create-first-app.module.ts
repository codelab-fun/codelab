import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { CommonModule } from '@angular/common';
import { CreateFirstAppComponent } from './create-first-app.component';

import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';
import { CodelabComponentsModule } from '../../components/codelab-components.module';
import { SlidesModule } from '../../../../../../../libs/slides/src';
import { SimpleEditorModule } from '../../../../../../../libs/code-demos/src/lib/editor/simple-editor.module';
import { FormsModule } from '@angular/forms';
import { ModeComponent } from './mode/mode.component';

const routes = RouterModule.forChild(
  [
    {
      path: '',
      redirectTo: '/create-first-app/intro',
      pathMatch: 'full'
    }, ...SlidesRoutes.get(CreateFirstAppComponent)
  ]
);

@NgModule({
  imports: [
    routes,
    PresentationModule,
    FeedbackModule,
    CommonModule,

    BrowserWindowModule,
    CodelabComponentsModule,
    SimpleEditorModule,
    SlidesModule,
    FormsModule,
  ],
  declarations: [CreateFirstAppComponent, ModeComponent],
  exports: [CreateFirstAppComponent]
})
export class CreateFirstAppModule {

}
