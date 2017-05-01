import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule, AngularFire } from 'angularfire2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FeedbackWidgetComponent } from './feedback-widget/feedback-widget.component';

const firebaseConfig = {
  apiKey: 'AIzaSyBDg_JEXDrn7iuvGR-xrcU1bmjWc-uxmgA',
  authDomain: 'ng2-codelab.firebaseapp.com',
  databaseURL: 'https://ng2-codelab.firebaseio.com',
  storageBucket: 'ng2-codelab.appspot.com'
};

export const angularFire = AngularFireModule.initializeApp(firebaseConfig);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    angularFire,
    FormsModule
  ],
  providers: [
    AngularFire
  ],
  declarations: [FeedbackWidgetComponent],
  exports: [FeedbackWidgetComponent]
})
export class FeedbackModule {

}
