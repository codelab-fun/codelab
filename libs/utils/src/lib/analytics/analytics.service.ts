import { Injectable, Optional } from '@angular/core';
import {
  Event as RouterEvent,
  NavigationEnd,
  NavigationError,
  Router
} from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';

export declare const ga;

@Injectable()
export class AnalyticsService {
  ga: (
    action: string,
    type: string,
    eventCategory?: string,
    eventAction?: string,
    timing?: number | string,
    extra?: string
  ) => void;

  constructor(@Optional() router: Router) {
    this.ga = window['ga'] || (() => 0);
    if (router) {
      router.events.subscribe(a => {
        if (a instanceof NavigationError) {
          console.log(a);
          throw new Error('Navigation error');
        }
      });

      router.events
        .pipe(
          distinctUntilChanged((previous: any, current: RouterEvent) => {
            if (current instanceof NavigationEnd) {
              return previous.url === current.url;
            }
            return true;
          })
        )
        .subscribe((x: NavigationEnd) => {
          this.ga('set', 'page', x.url);
          this.ga('send', 'pageview');
        });
    }
  }

  public sendEvent(
    eventCategory: string,
    eventAction: string,
    eventLabel: string
  ) {
    this.ga('send', 'event', eventCategory, eventAction, eventLabel);
  }

  public sendTiming(
    eventCategory: string,
    eventAction: string,
    timing: number,
    path: string
  ) {
    this.ga('send', 'timing', eventCategory, eventAction, timing, path);
  }
}
