import { RouterModule } from '@angular/router';
import { FeedbackModule } from '@codelab/feedback';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodePlaygroundComponent } from './code-playground.component';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { SlidesModule } from '@codelab/slides';

const routes = RouterModule.forChild(SlidesRoutes.get(CodePlaygroundComponent));

@NgModule({
  imports: [routes, SlidesModule, FeedbackModule, CommonModule],
  declarations: [CodePlaygroundComponent],
  exports: [CodePlaygroundComponent]
})
export class CodePlaygroundModule {}
