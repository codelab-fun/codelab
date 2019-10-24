import { Component, Input, Optional, Inject } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { MENU_ROUTES, MenuRoutes, MenuRoute } from '../../../common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'codelab-title-slide',
  templateUrl: './title-slide.component.html',
  styleUrls: ['./title-slide.component.css']
})
export class TitleSlideComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() prereqs: string;

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly presentation: SlidesDeckComponent,
    @Inject(MENU_ROUTES) private readonly menuRoutes
  ) {
    if (this.presentation != null) {
      this.setupPrevious();
    }
  }

  private setupPrevious() {
    const config = this.activeRoute.snapshot.pathFromRoot
      .map(a => a.routeConfig)
      .find((r) => r && (r as MenuRoute).prod);
    const index = this.menuRoutes.findIndex(c => c.path === config.path);
    let previousLink = '';
    if (index > 0) {
      previousLink = '../../' + this.menuRoutes[index - 1].path;
    }
    this.presentation.setPrevious(previousLink);
  }
}
