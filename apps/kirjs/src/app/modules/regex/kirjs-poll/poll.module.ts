import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KirjsPollComponent, SlidesAnswerComponent } from './kirjs-poll.component';

@NgModule({
  declarations: [KirjsPollComponent, SlidesAnswerComponent],
  exports: [KirjsPollComponent, SlidesAnswerComponent],
  imports: [
    CommonModule
  ]
})
export class PollModule {
}
