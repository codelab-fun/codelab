import { Component, Input, OnInit, Inject, Optional } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { MENU_ROUTES, MenuRoute } from '../../../common';
import { Router, ActivatedRoute } from '@angular/router';

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
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly presentation: SlidesDeckComponent,
    @Inject(MENU_ROUTES) private readonly menuRoutes
  ) {
    if (this.menuRoutes != null) {
      this.setupNext();
    }
  }

  private setupNext() {
    const config = this.activeRoute.snapshot.pathFromRoot
      .map(a => a.routeConfig)
      .find(r => r && (r as MenuRoute).prod);
    const index = this.menuRoutes.findIndex(c => c.path === config.path);
    let nextLink = '';
    if (index < this.menuRoutes.length - 1) {
      nextLink = '../../' + this.menuRoutes[index + 1].path;
    }
    this.presentation.setNext(nextLink);
  }

  ngOnInit() {}
}
