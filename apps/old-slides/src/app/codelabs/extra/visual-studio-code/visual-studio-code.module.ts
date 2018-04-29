import { RouterModule } from '@angular/router';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/feedback.module';
import { SlidesModule } from '../../../../../../../libs/slides/src/slides.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualStudioCodeComponent } from './visual-studio-code.component';
import { SlidesRoutes } from '../../../../../../../libs/slides/src/slide-routes';


const routes = RouterModule.forChild(
  SlidesRoutes.get(VisualStudioCodeComponent)
);

@NgModule({
  imports: [routes, SlidesModule, FeedbackModule, CommonModule],
  declarations: [VisualStudioCodeComponent],
  exports: [VisualStudioCodeComponent]
})
export class VisualStudioCodeModule {
}
