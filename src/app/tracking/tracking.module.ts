import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingDirective } from './tracking.directive';
import { AngularFireModule, AuthProviders, AuthMethods, AngularFire } from 'angularfire2';

const firebaseConfig = {
  apiKey: "AIzaSyBDg_JEXDrn7iuvGR-xrcU1bmjWc-uxmgA",
  authDomain: "ng2-codelab.firebaseapp.com",
  databaseURL: "https://ng2-codelab.firebaseio.com",
  storageBucket: "ng2-codelab.appspot.com"
};

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  declarations: [TrackingDirective],
  providers:[AngularFire],
  exports:[TrackingDirective]
})
export class TrackingModule { }
