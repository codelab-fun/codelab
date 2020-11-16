import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { FeedbackService } from './feedback.service';
import { FeedbackWidgetComponent } from './feedback-widget/feedback-widget.component';
import { FeedbackRatingComponent } from './feedback-rating/feedback-rating.component';
import { FeedbackIssueDropdownComponent } from '@codelab/feedback/src/lib/feedback-issue-dropdown/feedback-issue-dropdown.component';
import { HttpClientModule } from '@angular/common/http';
import { GithubModule, GithubService } from '@codelab/utils';

import { environment } from '../../../../apps/codelab/src/environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

export const angularFire = AngularFireModule.initializeApp(
  environment.firebaseConfig
);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    angularFire,
    FormsModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    GithubModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [FeedbackService, GithubService],
  declarations: [
    FeedbackWidgetComponent,
    FeedbackRatingComponent,
    FeedbackIssueDropdownComponent
  ],
  exports: [
    FeedbackWidgetComponent,
    FeedbackRatingComponent,
    FeedbackIssueDropdownComponent
  ]
})
export class FeedbackModule {}
