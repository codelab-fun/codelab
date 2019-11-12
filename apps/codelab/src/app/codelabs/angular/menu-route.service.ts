import { Injectable, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MENU_ROUTES, MenuRoute } from '../../common';

@Injectable({
  providedIn: 'root'
})
export class MenuRouteService {
  constructor(
    private readonly activeRoute: ActivatedRoute,
    @Inject(MENU_ROUTES) private readonly menuRoutes
  ) {
    console.log('constructor', this.activeRoute);
  }

  getPreviousLink(): string {
    const index = this.getCurrentIndex();
    if (index > 0) {
      return this.menuRoutes[index - 1].path;
    }
    return '';
  }

  getNextLink(): string {
    const index = this.getCurrentIndex();
    if (index < this.menuRoutes.length - 1) {
      return this.menuRoutes[index + 1].path;
    }
    return '';
  }

  private getCurrentIndex() {
    const ck = this.activeRoute.snapshot.pathFromRoot.map(a => a.routeConfig);

    console.log('cks', ck);
    const config = this.activeRoute.snapshot.pathFromRoot
      .map(a => a.routeConfig)
      .find(r => r && (r as MenuRoute).prod);
    console.log('menuroutes/config', this.menuRoutes, config, this.activeRoute);
    if (config == null) {
      console.log('return -1');
      return -1;
    }
    const index = this.menuRoutes.findIndex(c => c.path === config.path);
    return index;
  }
}
