import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';

@NgModule({
  declarations: [FeedbackComponent],
  entryComponents: [FeedbackComponent],
  exports: [FeedbackComponent],
  imports: [CommonModule]
})
export class FeedbackModule {}
