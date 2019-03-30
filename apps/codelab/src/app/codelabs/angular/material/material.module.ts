import { MaterialComponent } from './material.component';
import { NgModule } from '@angular/core';
import { SlidesRoutes } from 'ng-slides';

import { FeedbackModule } from '@codelab/feedback';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '@codelab/browser';

import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule
} from '@angular/material';
import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';

import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { SlidesModule } from 'ng-slides';
import { FormsModule } from '@angular/forms';

const routes = RouterModule.forChild([
  {
    path: '',
    redirectTo: '/angular/material/intro',
    pathMatch: 'full'
  },
  ...SlidesRoutes.get(MaterialComponent)
]);

@NgModule({
  imports: [
    routes,
    FeedbackModule,
    CommonModule,
    BrowserWindowModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    CodelabComponentsModule,
    SlidesModule,
    FormsModule
  ],
  declarations: [MaterialComponent],
  exports: [MaterialComponent],
  providers: [Ng2TsExercises]
})
export class MaterialCodelabModule {}
