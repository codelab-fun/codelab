import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseProvider } from 'angularfire2/database';
import { CommonModule } from '@angular/common';
import { FeedbackWidgetComponent } from './feedback-widget/feedback-widget.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

const firebaseConfig = {
  apiKey: 'AIzaSyBDg_JEXDrn7iuvGR-xrcU1bmjWc-uxmgA',
  authDomain: 'ng2-codelab.firebaseapp.com',
  databaseURL: 'https://ng2-codelab.firebaseio.com',
  storageBucket: 'ng2-codelab.appspot.com'
};

// Note! We are using AngularFire2 v4. There are a lot of breaking changes.
// See: https://github.com/angular/angularfire2/issues/854
export const af = AngularFireModule.initializeApp(firebaseConfig);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    af
  ],
  providers: [AngularFireDatabaseProvider],
  declarations: [FeedbackWidgetComponent],
  exports: [FeedbackWidgetComponent]
})
export class FeedbackModule {}
