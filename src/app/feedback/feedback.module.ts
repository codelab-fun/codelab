import { AngularFireDatabaseProvider } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { CommonModule } from '@angular/common';
import { FeedbackService } from './feedback.service';
import { FeedbackWidgetComponent } from './feedback-widget/feedback-widget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

const firebaseConfig = {
  apiKey: 'AIzaSyBDg_JEXDrn7iuvGR-xrcU1bmjWc-uxmgA',
  authDomain: 'ng2-codelab.firebaseapp.com',
  databaseURL: 'https://ng2-codelab.firebaseio.com',
  storageBucket: 'ng2-codelab.appspot.com'
};

// Note! We are using AngularFire2 v4. There are a lot of breaking changes.
// See: https://github.com/angular/angularfire2/issues/854
export const angularFire = AngularFireModule.initializeApp(firebaseConfig);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    angularFire,
    FormsModule
  ],
  providers: [AngularFireDatabaseProvider, FeedbackService],
  declarations: [FeedbackWidgetComponent, FeedbackFormComponent],
  exports: [FeedbackWidgetComponent]
})
export class FeedbackModule {

}
