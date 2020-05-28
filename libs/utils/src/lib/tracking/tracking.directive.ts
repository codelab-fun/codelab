import { Directive, HostListener } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SlidesDeckComponent } from '@ng360/slides';

@Directive({
  // tslint:disable-next-line:all TODO: Fix linter warnings on the selector and delete this comment.
  selector: '[slides-tracking]'
})
export class TrackingDirective {
  auth;
  lastSlideChange;
  history: Array<any> = [];

  constructor(
    private afDb: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router,
    private presentation: SlidesDeckComponent
  ) {
    afAuth.auth.signInAnonymously();
    afAuth.authState.subscribe(authData => {
      this.auth = authData;
    });
    this.lastSlideChange = Date.now();
  }

  @HostListener('slideChange', ['$event']) slideChange(index) {
    if (this.auth) {
      const dateNow = Date.now();
      const diffMinutes = dateNow - this.lastSlideChange;
      this.lastSlideChange = dateNow;
      const userHistory = this.afDb.list('/user_progress/' + this.auth.uid);
      userHistory.push({
        slideId: index,
        timeStamp: dateNow,
        msDiff: diffMinutes, // time user spent on the prev. slide
        route: this.router.url,
        totalSlides: this.presentation.slides.length,
        milestone: this.router.url.split('/')[1]
      });
    }
    // TODO: use observables to preserve all data
  }
}
