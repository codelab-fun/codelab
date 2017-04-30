import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule, AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FeedbackWidgetComponent } from './feedback-widget/feedback-widget.component';

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
    af,
    AngularFireModule.initializeApp(firebaseConfig),
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
