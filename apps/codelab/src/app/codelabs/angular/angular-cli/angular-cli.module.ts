import { AngularCliComponent } from './angular-cli.component';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';

import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';


import { CodelabComponentsModule } from '../../components/codelab-components.module';
import { SlidesModule } from '../../../../../../../libs/slides/src';

import { FormsModule } from '@angular/forms';

const routes = RouterModule.forChild([
  {
    path: '',
    redirectTo: '/angular-cli/intro',
    pathMatch: 'full'
  },
  ...SlidesRoutes.get(AngularCliComponent)
]);

@NgModule({
  imports: [
    routes,

    FeedbackModule,
    CommonModule,
    BrowserWindowModule,
    CodelabComponentsModule,

    SlidesModule,
    FormsModule
  ],
  declarations: [AngularCliComponent],
  exports: [AngularCliComponent]
})
export class AngularCliModule {}
