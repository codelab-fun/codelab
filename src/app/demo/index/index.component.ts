import {Component, Inject, OnDestroy} from '@angular/core';

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

export class IndexComponent implements OnDestroy {

  routes: Array<IndexPageRoute>;
  private firstVisit: boolean = false;

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
    // this.firstVisit = !localStorage.getItem("vistedBefore");
    console.log(this.firstVisit);
  }

  ngOnDestroy() {
    localStorage.setItem("visitedBefore", "yes");
  }

}
