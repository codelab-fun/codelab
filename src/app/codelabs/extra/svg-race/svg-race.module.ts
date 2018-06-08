import { NgModule, Pipe } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { SvgRaceComponent } from './svg-race.component';
import { PresentationModule } from '../../../presentation/presentation.module';
import { ExerciseModule } from '../../../exercise/exercise.module';
import { SimpleEditorModule } from '../ast/simple-editor/editor.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DomSanitizer } from '@angular/platform-browser';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { TimerComponent } from './timer/timer.component';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material';
import { RaceComponent } from './race/race.component';
import { LittleCarComponent } from './little-car/little-car.component';
import { FinishComponent } from './finish/finish.component';

const routes = RouterModule.forChild(
  SlidesRoutes.get(SvgRaceComponent)
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
    FlexLayoutModule,
    MatButtonModule,
  ],
  declarations: [
    RaceComponent,
    SafeHtml,
    SvgRaceComponent,
    TimerComponent,
    LittleCarComponent,
    FinishComponent
  ],
  exports: [SvgRaceComponent]
})
export class SvgRaceModule {

}
