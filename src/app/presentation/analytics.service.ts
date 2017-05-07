import {Injectable} from '@angular/core';
import {Event as RouterEvent, NavigationEnd, NavigationError, Router} from '@angular/router';

declare const ga;
@Injectable()
export class AnalyticsService {


  constructor(router: Router) {
    router.events.subscribe((a) => {

      if (a instanceof NavigationError) {
        throw new Error('Router is broken');
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
}
