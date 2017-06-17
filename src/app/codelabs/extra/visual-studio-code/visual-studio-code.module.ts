import { RouterModule } from '@angular/router';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { PresentationModule } from '../../../presentation/presentation.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualStudioCodeComponent } from './visual-studio-code.component';
import { SlidesRoutes } from '../../../presentation/slide-routes';


const routes = RouterModule.forChild(
  SlidesRoutes.get(VisualStudioCodeComponent)
);

@NgModule({
  imports: [routes, PresentationModule, FeedbackModule, CommonModule],
  declarations: [VisualStudioCodeComponent],
  exports: [VisualStudioCodeComponent]
})
export class VisualStudioCodeModule {
}
