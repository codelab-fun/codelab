import { RouterModule } from '@angular/router';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodePlaygroundComponent } from './code-playground.component';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { SlidesModule } from '../../../../../../../libs/slides/src';


const routes = RouterModule.forChild(
  SlidesRoutes.get(CodePlaygroundComponent)
);

@NgModule({
  imports: [routes, SlidesModule, FeedbackModule, CommonModule],
  declarations: [CodePlaygroundComponent],
  exports: [CodePlaygroundComponent]
})
export class CodePlaygroundModule {
}
