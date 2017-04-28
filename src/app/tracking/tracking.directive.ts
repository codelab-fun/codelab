import {Directive, HostListener} from '@angular/core';
import {PresentationComponent} from "../presentation/presentation/presentation.component";
import {AuthMethods, AuthProviders, AngularFire} from "angularfire2";
import {differ} from "../differ/differ";

@Directive({
  selector: '[app-tracking]'
})
export class TrackingDirective {
  auth;
  lastSlideChange;
  history:Array<any> = [];
  constructor(private angularFire:AngularFire) {
    this.angularFire.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous
    }).then(authData => {
      this.auth = authData;
    }).catch(() => { console.log('Authorization failed. Try refreshing the page.') });
    this.lastSlideChange = Date.now();
  }

  @HostListener('onSlideChange', ['$event']) onSlideChange(index) {
    if (this.auth){
      let diffMinutes = Date.now() - this.lastSlideChange;
      this.lastSlideChange = Date.now();
      let user_progress = this.angularFire.database.object('/user_progress/' + this.auth.uid);
      let history = this.angularFire.database.list('/user_progress/' + this.auth.uid + '/history');
      history.push({slideId:index, timeStamp: Date.now(), msDiff: diffMinutes});
      user_progress.update({currentSlide: index});
    }
  }
}
