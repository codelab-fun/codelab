import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MENU_ROUTES } from '../../common';

@Component({
  selector: 'codelab-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {
  active: string;
  readonly separator = '/';

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(MENU_ROUTES) readonly menuRoutes
  ) {
    this.active = this.activatedRoute.pathFromRoot.find(
      route => route.routeConfig && route.routeConfig['name']
    ).routeConfig['name'];
  }
}
