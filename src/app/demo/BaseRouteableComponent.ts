import {ActivatedRoute} from '@angular/router';
import {Injectable} from '@angular/core';
@Injectable()
export class BaseRouteableComponent {
  activeSlideId = 0;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    let id = Number(this.route.snapshot.params['id']);
    if (id) {
      this.activeSlideId = id;
    }
  }
}
