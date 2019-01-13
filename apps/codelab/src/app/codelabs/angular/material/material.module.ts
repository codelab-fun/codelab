import { MaterialComponent } from './material.component';
import { NgModule } from '@angular/core';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';

import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';

import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';
import { CodelabComponentsModule } from '../../components/codelab-components.module';
import { SlidesModule } from '../../../../../../../libs/slides/src';
import { FormsModule } from '@angular/forms';


const routes = RouterModule.forChild(
  [
    {
      path: '',
      redirectTo: '/material/intro',
      pathMatch: 'full'
    }, ...SlidesRoutes.get(MaterialComponent)
  ]
);

@NgModule({
  imports: [
    routes,
    PresentationModule,

    FeedbackModule,
    CommonModule,
    BrowserWindowModule,

    MatButtonModule,
    MatCardModule,
    MatInputModule,
    CodelabComponentsModule,
    SlidesModule,
    FormsModule,
  ],
  declarations: [MaterialComponent],
  exports: [MaterialComponent],
  providers: [Ng2TsExercises],
})
export class MaterialCodelabModule {
}
