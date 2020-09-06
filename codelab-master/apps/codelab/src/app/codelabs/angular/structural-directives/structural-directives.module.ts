import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { FeedbackModule } from '@codelab/feedback';
import { CodeDemoModule } from '@codelab/code-demos';
import { BrowserWindowModule } from '@codelab/browser';
import { StructuralDirectivesComponent } from './structural-directives.component';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';

const routes = RouterModule.forChild(
  SlidesRoutes.get(StructuralDirectivesComponent)
);

@NgModule({
  imports: [
    routes,
    CodeDemoModule,
    BrowserWindowModule,
    FeedbackModule,
    CodelabComponentsModule,
    SlidesModule,
    FormsModule
  ],
  declarations: [StructuralDirectivesComponent],
  exports: [StructuralDirectivesComponent]
})
export class StructuralDirectivesModule {}
