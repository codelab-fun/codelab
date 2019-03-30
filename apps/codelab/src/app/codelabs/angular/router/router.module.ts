import { RouterComponent } from './router.component';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from 'ng-slides';

import { FeedbackModule } from '@codelab/feedback';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '@codelab/browser';

import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';

import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { SlidesModule } from 'ng-slides';

import { FormsModule } from '@angular/forms';

const routes = RouterModule.forChild([
  {
    path: '',
    redirectTo: '/angular/router/intro',
    pathMatch: 'full'
  },
  ...SlidesRoutes.get(RouterComponent)
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
  declarations: [RouterComponent],
  providers: [Ng2TsExercises],
  exports: [RouterComponent]
})
export class RouterCodelabModule {}
