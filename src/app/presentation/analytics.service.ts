import {Injectable} from '@angular/core';
import {Event as RouterEvent, NavigationEnd, NavigationError, Router} from '@angular/router';

export declare const ga;

@Injectable()
export class AnalyticsService {


  constructor(router: Router) {
    router.events.subscribe((a) => {

      if (a instanceof NavigationError) {
        console.log(a);
        throw new Error('Navigation error');
      }
    });
    router.events.distinctUntilChanged((previous: any, current: RouterEvent) => {
      if (current instanceof NavigationEnd) {
        return previous.url === current.url;
      }
      return true;
    }).subscribe((x: NavigationEnd) => {

      ga('set', 'page', x.url);
      ga('send', 'pageview');
    });
  }

  public sendEvent(eventCategory: string, eventAction: string, eventLabel: string) {
    console.log('send, event', arguments);
    ga('send', 'event', eventCategory, eventAction, eventLabel);
  }

  public sendTiming(eventCategory: string, eventAction: string, timing: number, path: string) {
    console.log('send, timing', arguments);
    ga('send', 'timing', eventCategory, eventAction, timing, path);
  }
}
