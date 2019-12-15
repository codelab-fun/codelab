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
      return this.getMenuRoutePathByIndex(index - 1);
    }
    return '';
  }

  getNextLink(activeRoute: ActivatedRoute): string {
    const index = this.getCurrentIndex(activeRoute);
    if (index < this.menuRoutes.length - 1) {
      return this.getMenuRoutePathByIndex(index + 1);
    }
    return '';
  }

  private getCurrentIndex(activeRoute: ActivatedRoute): number {
    // TODO: figure out a way to inject the ActivatedRoute instead of parameter
    // This method gets the index of the current menuRoute. Ideally we should be able
    // to inject in the ActivatedRoute in the constructor. However we noticed that
    // probably because this is a service, activatedRoute has the value when the
    // service is constructed and not the current activated route. We are using a
    // workaround now which expects the calling method to pass the current activated
    // route. Fix this to use DI.
    const config = activeRoute.snapshot.pathFromRoot
      .map(a => a.routeConfig)
      .find(r => r && (r as MenuRoute).prod);
    if (config == null) {
      return -1;
    }
    const index = this.menuRoutes.findIndex(c => c.path === config.path);
    return index;
  }

  private getMenuRouteByIndex(index: number) {
    if (index >= 0 && index < this.menuRoutes.length) {
      return this.menuRoutes[index];
    }
    return null;
  }

  private getMenuRoutePathByIndex(index: number): string {
    const indexRoute = this.getMenuRouteByIndex(index);
    if (indexRoute != null) {
      let path = indexRoute.path;
      if (path) {
        path = '../../' + path;
      }
      return path;
    }
    return '';
  }
}
