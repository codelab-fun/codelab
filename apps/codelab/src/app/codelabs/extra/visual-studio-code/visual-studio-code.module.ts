import { RouterModule } from '@angular/router';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualStudioCodeComponent } from './visual-studio-code.component';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { SlidesModule } from '../../../../../../../libs/slides/src';
import { CodelabComponentsModule } from '../../components/codelab-components.module';


const routes = RouterModule.forChild(
  SlidesRoutes.get(VisualStudioCodeComponent)
);

@NgModule({
  imports: [
    SlidesModule,
    CodelabComponentsModule,
    routes,
    PresentationModule,
    FeedbackModule,
    CommonModule
  ],
  declarations: [VisualStudioCodeComponent],
  exports: [VisualStudioCodeComponent]
})
export class VisualStudioCodeModule {
}
