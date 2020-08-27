import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core';
import { SlidesModule } from '@ng360/slides';
import { BrowserWindowModule } from '@codelab/browser';
import { FeedbackMessageTableComponent } from './feedback-message-table/feedback-message-table.component';
import { FeedbackComponent } from './feedback.component';
import { FeedbackModule as FeedbackLibModule } from '@codelab/feedback';

@NgModule({
  imports: [
    RouterModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserWindowModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SlidesModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSortModule,
    FeedbackLibModule
  ],
  declarations: [FeedbackComponent, FeedbackMessageTableComponent],
  exports: [FeedbackComponent],
  entryComponents: [FeedbackComponent]
})
export class FeedbackModule {}
