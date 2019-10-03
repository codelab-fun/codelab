import { Component, Input, Optional, Inject } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { MENU_ROUTES } from '../../../common';
import { Router } from '@angular/router';

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
    private readonly router: Router,
    private readonly presentation: SlidesDeckComponent,
    @Optional() @Inject(MENU_ROUTES) readonly menuRoutes
  ) {
    if (this.presentation != null) {
      this.setupPreviousNext();
    }
  }

  private setupPreviousNext() {
    let previousLink = '';
    const allRoutes = this.menuRoutes.map(p => p.path);
    let currentUrl = this.router.url;
    if (currentUrl.startsWith('/')) {
      currentUrl = currentUrl.substr(1);
    }
    const urlPaths = currentUrl.split('/');
    if (urlPaths.length > 1) {
      const idx = allRoutes.indexOf(urlPaths[1]);
      if (idx > 0) {
        previousLink = `/${urlPaths[0]}/${allRoutes[idx - 1]}`;
      }
    }
    this.presentation.setPrevious(previousLink);
  }
}
