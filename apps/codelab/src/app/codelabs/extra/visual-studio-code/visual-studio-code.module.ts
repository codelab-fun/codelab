import { RouterModule } from '@angular/router';
import { FeedbackModule } from '@codelab/feedback';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { VisualStudioCodeComponent } from './visual-studio-code.component';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';

const routes = RouterModule.forChild(
  SlidesRoutes.get(VisualStudioCodeComponent)
);

@NgModule({
  imports: [
    SlidesModule,
    CodelabComponentsModule,
    routes,

    FeedbackModule,
    CommonModule
  ],
  declarations: [VisualStudioCodeComponent],
  exports: [VisualStudioCodeComponent]
})
export class VisualStudioCodeModule {}
