import { RouterModule } from '@angular/router';
import { FeedbackModule } from '@mycurrentapp/feedback/src/feedback.module';
import { PresentationModule } from '@mycurrentapp/presentation/src/presentation.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualStudioCodeComponent } from './visual-studio-code.component';
import { SlidesRoutes } from '@mycurrentapp/presentation/src/slide-routes';

const routes = RouterModule.forChild(SlidesRoutes.get(VisualStudioCodeComponent));

@NgModule({
  imports: [routes, PresentationModule, FeedbackModule, CommonModule],
  declarations: [VisualStudioCodeComponent],
  exports: [VisualStudioCodeComponent]
})
export class VisualStudioCodeModule {}
