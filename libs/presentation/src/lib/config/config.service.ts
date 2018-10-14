import { Injectable, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PresentationConfigService {

  milestone = '';
  hideControls = false;

  constructor(@Optional() private route: ActivatedRoute) {
    if (route) {
      this.milestone = this.route.snapshot.queryParams['milestone'];
      this.hideControls = this.route.snapshot.queryParams['hideControls'] || this.hideControls;
    }
  }

  get activeSlideIndex() {
    return this.route ? this.route.snapshot.params.id : 0;
  }

  get path() {
    return this.route && this.route.parent && this.route.parent.snapshot.routeConfig && this.route.parent.snapshot.routeConfig.path || 'index';
  }
}
