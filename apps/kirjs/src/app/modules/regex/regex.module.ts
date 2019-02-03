import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegexComponent } from './regex.component';
import { SlidesModule } from '@codelab/slides';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@codelab/presentation/src/lib/slide-routes';
import { KirjsPollComponent } from './kirjs-poll/kirjs-poll.component';
import { PollModule } from './kirjs-poll/poll.module';

const routes = RouterModule.forChild(
  SlidesRoutes.get(RegexComponent)
);


@NgModule({
  declarations: [RegexComponent],
  imports: [
    PollModule,
    routes,
    CommonModule,
    SlidesModule
  ]
})
export class RegexModule {
}
