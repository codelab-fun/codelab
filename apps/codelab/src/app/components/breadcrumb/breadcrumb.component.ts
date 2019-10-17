import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { menuRoutes } from '../../codelabs/angular/angular-routing.module';

@Component({
  selector: 'codelab-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  active: string;
  readonly menuRoutes = menuRoutes;
  readonly separator = '/';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.active = this.activatedRoute.pathFromRoot.find(
      route => route.routeConfig && route.routeConfig['name']
    ).routeConfig['name'];
  }
}
