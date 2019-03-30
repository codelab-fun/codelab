import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from 'ng-slides';

import { FeedbackModule } from '@codelab/feedback';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '@codelab/browser';

import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule } from '@angular/forms';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { SlidesModule } from 'ng-slides';

import { ModeComponent } from './mode/mode.component';

import { CreateFirstAppComponent } from './create-first-app.component';

const routes = RouterModule.forChild([
  {
    path: '',
    redirectTo: '/angular/create-first-app/intro',
    pathMatch: 'full'
  },
  ...SlidesRoutes.get(CreateFirstAppComponent)
]);

@NgModule({
  imports: [
    routes,

    FeedbackModule,
    CommonModule,
    CodeDemoModule,
    BrowserWindowModule,
    CodelabComponentsModule,

    SlidesModule,
    FormsModule
  ],
  declarations: [CreateFirstAppComponent, ModeComponent],
  exports: [CreateFirstAppComponent]
})
export class CreateFirstAppModule {}
