import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationComponent } from './presentation.component';
import { BrowserWindowModule } from '@codelab/browser';
import { CodeDemoModule } from '@codelab/code-demos';
import { FeedbackModule } from '@codelab/feedback';
import { CodelabComponentsModule } from '../../components/codelab-components.module';
import { SlidesModule } from '@codelab/slides';
import { FormsModule } from '@angular/forms';
import { SlideComponent } from './slide/slide.component';

@NgModule({
  declarations: [PresentationComponent],
  imports: [
    CommonModule,
    BrowserWindowModule,
    CodeDemoModule,
    FeedbackModule,
    CodelabComponentsModule,
    SlidesModule,
    FormsModule,
    SlideComponent,
  ],
})
export class PresentationModule {}
