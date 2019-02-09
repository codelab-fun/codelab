import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'codelab-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  readonly milestone: string;
  readonly separator = '/';

  constructor(activatedRoute: ActivatedRoute) {
    this.milestone = activatedRoute.pathFromRoot.find(route => route.routeConfig && route.routeConfig['name']).routeConfig['name'];
  }

  ngOnInit() {
  }

}
