import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { FeedbackModule } from '@codelab/feedback';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '@codelab/browser';
import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule } from '@angular/forms';
import { IntroComponent } from './intro.component';

@NgModule({
  imports: [
    RouterModule.forChild([...SlidesRoutes.get(IntroComponent)]),
    FeedbackModule,
    CommonModule,
    CodeDemoModule,
    BrowserWindowModule,
    CodeDemoModule,
    SlidesModule,
    FormsModule
  ],
  declarations: [IntroComponent],
  exports: [IntroComponent]
})
export class IntroModule {}
