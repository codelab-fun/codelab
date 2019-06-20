import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollComponent, SlidesAnswerComponent } from './poll.component';

@NgModule({
  declarations: [PollComponent, SlidesAnswerComponent],
  exports: [PollComponent, SlidesAnswerComponent],
  imports: [CommonModule]
})
export class PollModule {}
