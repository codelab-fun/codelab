import { Component, Input, OnInit, Inject, Optional } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { MENU_ROUTES } from '../../../common';
import { Router } from '@angular/router';

@Component({
  selector: 'codelab-closing-slide',
  templateUrl: './codelab-closing-slide.component.html',
  styleUrls: ['./codelab-closing-slide.component.css']
})
export class CodelabClosingSlideComponent implements OnInit {
  @Input() header: String;
  @Input() body: String;
  @Input() footer: String;

  constructor(
    private readonly router: Router,
    private readonly presentation: SlidesDeckComponent,
    @Optional() @Inject(MENU_ROUTES) readonly menuRoutes
  ) {
    if (this.presentation != null && this.menuRoutes != null) {
      this.setupPreviousNext();
    }
  }

  private setupPreviousNext() {
    let previousLink = '';
    let nextLink = '';
    let allRoutes = this.menuRoutes.map(p => p.path);
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
      if (idx < allRoutes.length - 1) {
        nextLink = `/${urlPaths[0]}/${allRoutes[idx + 1]}`;
      }
    }
    this.presentation.setPrevious(previousLink);
    this.presentation.setNext(nextLink);
  }

  ngOnInit() {}
}
