import { AngularFireDatabaseProvider } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { CommonModule } from '@angular/common';
import { FeedbackService } from './feedback.service';
import { FeedbackWidgetComponent } from './feedback-widget/feedback-widget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { environment } from '../../environments/environment';
import { FeedbackRatingComponent } from './feedback-rating/feedback-rating.component';

// Note! We are using AngularFire2 v4. There are a lot of breaking changes.
// See: https://github.com/angular/angularfire2/issues/854
export const angularFire = AngularFireModule.initializeApp(environment.firebaseConfig);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    angularFire,
    FormsModule
  ],
  providers: [AngularFireDatabaseProvider, FeedbackService],
  declarations: [FeedbackWidgetComponent, FeedbackFormComponent, FeedbackRatingComponent],
  exports: [FeedbackWidgetComponent, FeedbackFormComponent, FeedbackRatingComponent]
})
export class FeedbackModule {

}
