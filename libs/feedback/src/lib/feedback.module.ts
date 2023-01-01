import {
  importProvidersFrom,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { FeedbackService } from './feedback.service';
import { FeedbackWidgetComponent } from './feedback-widget/feedback-widget.component';
import { FeedbackRatingComponent } from './feedback-rating/feedback-rating.component';
import { FeedbackIssueDropdownComponent } from './feedback-issue-dropdown/feedback-issue-dropdown.component';
import { HttpClientModule } from '@angular/common/http';
import { GithubModule, GithubService } from '@codelab/utils';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FirebaseOptions } from '@angular/fire/app';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    FormsModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    GithubModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [FeedbackService, GithubService],
  declarations: [
    FeedbackWidgetComponent,
    FeedbackRatingComponent,
    FeedbackIssueDropdownComponent,
  ],
  exports: [
    FeedbackWidgetComponent,
    FeedbackRatingComponent,
    FeedbackIssueDropdownComponent,
  ],
})
export class FeedbackModule {
  public static forRoot(
    firebaseOptions: FirebaseOptions
  ): ModuleWithProviders<FeedbackModule> {
    const providers = [
      importProvidersFrom(
        AngularFireModule.initializeApp(firebaseOptions)
      )
    ];

    return {
      ngModule: FeedbackModule,
      providers,
    };
  }
}
