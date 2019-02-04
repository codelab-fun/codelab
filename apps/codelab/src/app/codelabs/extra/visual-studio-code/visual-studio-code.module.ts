import { RouterModule } from '@angular/router';
import { FeedbackModule } from '@codelab/feedback';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualStudioCodeComponent } from './visual-studio-code.component';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { SlidesModule } from '@codelab/slides';
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
