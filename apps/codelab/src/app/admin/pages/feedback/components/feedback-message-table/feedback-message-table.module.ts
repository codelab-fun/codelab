import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FeedbackModule } from '@codelab/feedback';
import { FeedbackMessageTableComponent } from './feedback-message-table.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    RouterLink,
    FeedbackModule,
  ],
  declarations: [FeedbackMessageTableComponent],
  exports: [FeedbackMessageTableComponent],
})
export class FeedbackMessageTableModule {

}
