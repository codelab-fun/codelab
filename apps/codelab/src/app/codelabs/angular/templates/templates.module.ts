import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { TemplatesComponent } from './templates.component';
import { SlidesRoutes } from 'ng-slides';

import { FeedbackModule } from '@codelab/feedback';

import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { SlidesModule } from 'ng-slides';

import { FormsModule } from '@angular/forms';
import { CodeDemoModule } from '@codelab/code-demos';

const routes = RouterModule.forChild([
  {
    path: '',
    redirectTo: '/angular/templates/intro',
    pathMatch: 'full'
  },
  ...SlidesRoutes.get(TemplatesComponent)
]);

@NgModule({
  imports: [
    routes,

    CodeDemoModule,
    FeedbackModule,
    CodelabComponentsModule,

    SlidesModule,
    FormsModule
  ],
  declarations: [TemplatesComponent],
  exports: [TemplatesComponent]
})
export class TemplatesModule {}
