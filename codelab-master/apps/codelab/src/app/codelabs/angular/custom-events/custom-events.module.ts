import { CustomEventsComponent } from './custom-events.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeedbackModule } from '@codelab/feedback';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '@codelab/browser';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { FormsModule } from '@angular/forms';
import { CodeDemoModule } from '@codelab/code-demos';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';

const routes = RouterModule.forChild([
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
