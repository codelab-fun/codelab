import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserWindowModule } from '@codelab/browser';
import { FeedbackComponent } from './feedback.component';
import { FeedbackMessageTableModule } from './components/feedback-message-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatExpansionModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserWindowModule,
    FeedbackMessageTableModule,
  ],
  declarations: [FeedbackComponent],
  exports: [FeedbackComponent],
})
export class FeedbackModule {
}
