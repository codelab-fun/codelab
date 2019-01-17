import { NgModule } from '@angular/core';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';

import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';

import { RouterModule } from '@angular/router';
import { FormsComponent } from './forms.component';
import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';
import { CodelabComponentsModule } from '../../components/codelab-components.module';
import { SlidesModule } from '../../../../../../../libs/slides/src';

import { FormsModule } from '@angular/forms';

const routes = RouterModule.forChild(
  [
    {
      path: '',
      redirectTo: '/forms/intro',
      pathMatch: 'full'
    }, ...SlidesRoutes.get(FormsComponent)
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
    SlidesModule,
    
    FormsModule,
  ],
  declarations: [FormsComponent],
  exports: [FormsComponent],
  providers: [Ng2TsExercises],
})
export class FormsCodelabModule {
}
