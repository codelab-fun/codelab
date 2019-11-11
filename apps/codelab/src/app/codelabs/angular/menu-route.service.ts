import { ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';
import { MENU_ROUTES, MenuRoute } from '../../common';

export class MenuRouteService {
  constructor(
    private readonly activeRoute: ActivatedRoute,
    @Inject(MENU_ROUTES) private readonly menuRoutes
  ) {}

  getPreviousLink(): string {
    const index = this.getCurrentIndex();
    let previousLink = '';
    if (index > 0) {
      previousLink = '../../' + this.menuRoutes[index - 1].path;
    }
    return previousLink;
  }

  getNextLink(): string {
    const index = this.getCurrentIndex();
    let nextLink = '';
    if (index < this.menuRoutes.length - 1) {
      nextLink = '../../' + this.menuRoutes[index + 1].path;
    }
    return nextLink;
  }

  private getCurrentIndex() {
    const config = this.activeRoute.snapshot.pathFromRoot
      .map(a => a.routeConfig)
      .find(r => r && (r as MenuRoute).prod);
    const index = this.menuRoutes.findIndex(c => c.path === config.path);
    return index;
  }
}
