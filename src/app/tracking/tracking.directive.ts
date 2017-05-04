import {Directive, HostListener} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from "@angular/router";

@Directive({
  selector: '[app-tracking]'
})
export class TrackingDirective {
  auth;
  lastSlideChange;
  history: Array<any> = [];


  constructor(private afDb: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) {
    afAuth.auth.signInAnonymously();
    afAuth.authState.subscribe(authData => {
      this.auth = authData;
    });
    this.lastSlideChange = Date.now();
  }

  @HostListener('onSlideChange', ['$event']) onSlideChange(index) {
    if (this.auth) {
      let diffMinutes = Date.now() - this.lastSlideChange;
      this.lastSlideChange = Date.now();
      let user_progress = this.afDb.object('/user_progress/' + this.auth.uid);
      let history = this.afDb.list('/user_progress/' + this.auth.uid + '/history');
      history.push({slideId: index, timeStamp: Date.now(), msDiff: diffMinutes, route: this.router.url});
      user_progress.update({currentSlide: index});
    }
  }
}
