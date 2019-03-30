import { CustomEventsComponent } from './custom-events.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from 'ng-slides';
import { FeedbackModule } from '@codelab/feedback';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '@codelab/browser';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { SlidesModule } from 'ng-slides';
import { FormsModule } from '@angular/forms';
import { CodeDemoModule } from '@codelab/code-demos';

const routes = RouterModule.forChild([
  {
    path: '',
    redirectTo: '/angular/custom-events/intro',
    pathMatch: 'full'
  },
  ...SlidesRoutes.get(CustomEventsComponent)
]);

@NgModule({
  imports: [
    routes,
    FeedbackModule,
    CommonModule,
    BrowserWindowModule,
    CodeDemoModule,
    CodelabComponentsModule,
    SlidesModule,
    FormsModule
  ],
  declarations: [CustomEventsComponent],
  exports: [CustomEventsComponent]
})
export class CustomEventsModule {}
