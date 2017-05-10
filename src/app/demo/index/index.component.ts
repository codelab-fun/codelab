import {Component, Inject, OnInit} from '@angular/core';


export interface IndexPageRoute {
  name: string;
  description: string;
  page?: string;
}
@Component({
  selector: 'slides-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  routes: Array<IndexPageRoute>;

  getMainPageRoutes() {
    return this.getPageRoutes('main');
  }

  getBonusPageRoutes() {
    return this.getPageRoutes('bonus');
  }

  getPageRoutes(page: string) {
    return this.routes.filter(route => route.page === page);
  }

  constructor(@Inject('ROUTES') routes: Array<IndexPageRoute>) {
    this.routes = routes.filter(route => route.name);
  }

  ngOnInit() {
  }

}
