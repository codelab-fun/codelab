import { Injectable, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MENU_ROUTES, MenuRoute } from '../../common';

@Injectable({
  providedIn: 'root'
})
export class MenuRouteService {
  constructor(@Inject(MENU_ROUTES) private readonly menuRoutes) {}

  getPreviousLink(activeRoute: ActivatedRoute): string {
    const index = this.getCurrentIndex(activeRoute);
    if (index > 0) {
      return this.menuRoutes[index - 1].path;
    }
    return '';
  }

  getNextLink(activeRoute: ActivatedRoute): string {
    const index = this.getCurrentIndex(activeRoute);
    if (index < this.menuRoutes.length - 1) {
      return this.menuRoutes[index + 1].path;
    }
    return '';
  }

  private getCurrentIndex(activeRoute: ActivatedRoute) {
    // TODO: inject ActivatedRoute but figure out a way to fix snapshot update issue
    const config = activeRoute.snapshot.pathFromRoot
      .map(a => a.routeConfig)
      .find(r => r && (r as MenuRoute).prod);
    if (config == null) {
      return -1;
    }
    const index = this.menuRoutes.findIndex(c => c.path === config.path);
    return index;
  }
}
