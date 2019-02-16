import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { CommonModule } from '@angular/common';
import { FeedbackService } from './feedback.service';
import { FeedbackWidgetComponent } from './feedback-widget/feedback-widget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { environment } from '../../../../apps/codelab/src/environments/environment';
import { FeedbackRatingComponent } from './feedback-rating/feedback-rating.component';

// Note! We are using AngularFire2 v4. There are a lot of breaking changes.
// See: https://github.com/angular/@angular/fire/issues/854
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
    AngularFireDatabaseModule
  ],
  providers: [FeedbackService],
  declarations: [
    FeedbackWidgetComponent,
    FeedbackFormComponent,
    FeedbackRatingComponent
  ],
  exports: [
    FeedbackWidgetComponent,
    FeedbackFormComponent,
    FeedbackRatingComponent
  ]
})
export class FeedbackModule {}
