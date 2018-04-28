import { NgModule, Pipe } from '@angular/core';
import { FeedbackModule } from '../../../libs/feedback/src/feedback.module';
import { SvgComponent } from './svg.component';
import { SlidesModule } from '@slides/slides/src/slides.module';
import { ExerciseModule } from '../../../libs/exercise/src/exercise.module';
import { SimpleEditorModule } from '../../ast/src/simple-editor/editor.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SvgDemoComponent } from './svg-demo/svg-demo.component';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgPlaygroundComponent } from './svg-playground/svg-playground.component';
import { RunnersModule } from '../../../libs/exercise/src/runners/runners.module';
import { TimerComponent } from './timer/timer.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Pipe({name: 'safeHtml'})
export class SafeHtml {
  constructor(private readonly sanitizer: DomSanitizer) {
  }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

@NgModule({
  imports: [
    CommonModule,
    SlidesModule,
    FeedbackModule,
    ExerciseModule,
    RunnersModule,
    SimpleEditorModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule
  ],
  declarations: [SvgComponent, SvgDemoComponent, SafeHtml, SvgPlaygroundComponent, TimerComponent],
  exports: [SvgComponent],
})
export class SvgModule {

}
