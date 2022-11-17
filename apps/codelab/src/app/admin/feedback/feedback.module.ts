import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
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
    FeedbackLibModule,
  ],
  declarations: [FeedbackComponent, FeedbackMessageTableComponent],
  exports: [FeedbackComponent],
})
export class FeedbackModule {}
