import {
  AngularFire,
  AngularFireModule,
  AuthMethods,
  AuthProviders
  } from 'angularfire2';
import { CommonModule } from '@angular/common';
import { FeedbackWidgetComponent } from './feedback-widget/feedback-widget.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

const firebaseConfig = {
  apiKey: "AIzaSyBDg_JEXDrn7iuvGR-xrcU1bmjWc-uxmgA",
  authDomain: "ng2-codelab.firebaseapp.com",
  databaseURL: "https://ng2-codelab.firebaseio.com",
  storageBucket: "ng2-codelab.appspot.com"
};

export const af = AngularFireModule.initializeApp(firebaseConfig);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AngularFire
  ],
  declarations: [FeedbackWidgetComponent],
  exports: [FeedbackWidgetComponent]
})
export class FeedbackModule { 
  
}
