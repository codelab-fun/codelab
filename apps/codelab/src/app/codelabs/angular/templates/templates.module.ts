import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { FeedbackModule } from '@codelab/feedback';
import { CodeDemoModule } from '@codelab/code-demos';
import { TemplatesComponent } from './templates.component';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';

const routes = RouterModule.forChild([...SlidesRoutes.get(TemplatesComponent)]);

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
