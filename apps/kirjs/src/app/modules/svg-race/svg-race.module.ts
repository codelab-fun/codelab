import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';

import { FeedbackModule } from '@codelab/feedback';
import { SyncModule } from '@codelab/utils/src/lib/sync/sync.module';
import { CodeDemoModule } from '@codelab/code-demos';
import { TimerComponent } from './timer/timer.component';
import { RaceComponent } from './race/race.component';
import { LittleCarComponent } from './little-car/little-car.component';
import { FinishComponent } from './finish/finish.component';
import { PlayerComponent } from './player/player.component';
import { SvgRaceComponent } from './svg-race.component';
import { ButtonsNavBarModule } from '../../../../../codelab/src/app/components/buttons-nav-bar/buttons-nav-bar.module';

const routes = RouterModule.forChild(SlidesRoutes.get(SvgRaceComponent));

@Pipe({ name: 'safeHtml' })
export class SafeHtml implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

@NgModule({
  imports: [
    routes,
    CommonModule,
    SlidesModule,
    ButtonsNavBarModule,
    FeedbackModule,
    CodeDemoModule,
    FormsModule,
    MatButtonModule,
    SyncModule,
    ReactiveFormsModule
  ],
  declarations: [
    RaceComponent,
    SafeHtml,
    SvgRaceComponent,
    TimerComponent,
    LittleCarComponent,
    FinishComponent,
    PlayerComponent
  ],
  exports: [SvgRaceComponent]
})
export class SvgRaceModule {}
