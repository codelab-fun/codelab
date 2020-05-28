import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeedbackModule } from '@codelab/feedback';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '@codelab/browser';
import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule } from '@angular/forms';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { ModeComponent } from './mode/mode.component';
import { CreateFirstAppComponent } from './create-first-app.component';

const routes = RouterModule.forChild([
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
    CodeDemoModule,
    SlidesModule,
    FormsModule
  ],
  declarations: [CreateFirstAppComponent, ModeComponent],
  exports: [CreateFirstAppComponent]
})
export class CreateFirstAppModule {}
