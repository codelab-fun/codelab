import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { FeedbackModule } from '@codelab/feedback';
import { CodePlaygroundComponent } from './code-playground.component';

const routes = RouterModule.forChild(SlidesRoutes.get(CodePlaygroundComponent));

@NgModule({
  imports: [routes, SlidesModule, FeedbackModule, CommonModule],
  declarations: [CodePlaygroundComponent],
  exports: [CodePlaygroundComponent]
})
export class CodePlaygroundModule {}
