import { NgModule, Pipe } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { SvgComponent } from './svg.component';
import { PresentationModule } from '../../../presentation/presentation.module';
import { ExerciseModule } from '../../../exercise/exercise.module';
import { SimpleEditorModule } from '../ast/simple-editor/editor.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SvgDemoComponent } from './svg-demo/svg-demo.component';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgPlaygroundComponent } from './svg-playground/svg-playground.component';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { TimerComponent } from './timer/timer.component';
import { CommonModule } from '@angular/common';

const routes = RouterModule.forChild(
  SlidesRoutes.get(SvgComponent)
);


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
    routes,
    CommonModule,
    PresentationModule,
    FeedbackModule,
    ExerciseModule,
    RunnersModule,
    SimpleEditorModule,
    FormsModule,
    FlexLayoutModule
  ],
  declarations: [SvgComponent, SvgDemoComponent, SafeHtml, SvgPlaygroundComponent, TimerComponent],
  exports: [SvgComponent]
})
export class SvgModule {

}
