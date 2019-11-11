import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { FeedbackModule } from '@codelab/feedback';
import { SvgComponent } from './svg.component';

import { FormsModule } from '@angular/forms';
import { SvgDemoComponent } from './svg-demo/svg-demo.component';
import { SvgPlaygroundComponent } from './svg-playground/svg-playground.component';

import { TimerComponent } from './timer/timer.component';
import { CommonModule } from '@angular/common';
import { SvgTogetherComponent } from './svg-together/svg-together.component';
import { MatButtonModule } from '@angular/material/button';
import { SvgTogetherResultComponent } from './svg-together-result/svg-together-result.component';
import { NewProgressBarModule } from '../ast/new-progress-bar/new-progress-bar.module';
import { SharedPipeModule } from '@codelab/utils/src/lib/pipes/pipes.module';
import { SlidesModule } from '@codelab/slides';
import { CodeDemoModule } from '@codelab/code-demos';

const routes = RouterModule.forChild(SlidesRoutes.get(SvgComponent));

@NgModule({
  imports: [
    routes,
    CommonModule,
    FeedbackModule,
    FormsModule,
    MatButtonModule,
    NewProgressBarModule,
    SharedPipeModule,
    SlidesModule,
    CodeDemoModule
  ],
  declarations: [
    SvgComponent,
    SvgTogetherComponent,
    SvgTogetherResultComponent,
    SvgDemoComponent,
    SvgPlaygroundComponent,
    TimerComponent
  ],
  exports: [SvgComponent]
})
export class SvgModule {}
