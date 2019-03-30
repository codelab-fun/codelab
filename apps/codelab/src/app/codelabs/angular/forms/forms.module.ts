import { NgModule } from '@angular/core';
import { SlidesRoutes } from 'ng-slides';

import { FeedbackModule } from '@codelab/feedback';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '@codelab/browser';

import { RouterModule } from '@angular/router';
import { FormsComponent } from './forms.component';
import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';

import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { SlidesModule } from 'ng-slides';

import { FormsModule } from '@angular/forms';

const routes = RouterModule.forChild([
  {
    path: '',
    redirectTo: '/angular/forms/intro',
    pathMatch: 'full'
  },
  ...SlidesRoutes.get(FormsComponent)
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
  declarations: [FormsComponent],
  exports: [FormsComponent],
  providers: [Ng2TsExercises]
})
export class FormsCodelabModule {}
