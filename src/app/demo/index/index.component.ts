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
  public firstVisit: boolean;

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
    const bool: boolean = !!localStorage.getItem('visitedBefore'); // can't set directly fsr
    this.firstVisit = !bool;
  }

  ngOnDestroy() {
    localStorage.setItem('visitedBefore', 'yes');
  }

}
