import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TemplatesComponent } from './templates.component';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { FeedbackModule } from '@codelab/feedback';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { SlidesModule } from '@codelab/slides';
import { FormsModule } from '@angular/forms';
import { CodeDemoModule } from '@codelab/code-demos';

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
