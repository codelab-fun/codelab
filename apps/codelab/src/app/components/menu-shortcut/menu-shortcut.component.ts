import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface MenuShortcutRoute {
  name: string;
  description: string;
  page?: string;
  translationIds?: string[];
}


@Component({
  selector: 'slides-menu-shortcut',
  templateUrl: './menu-shortcut.component.html',
  styleUrls: ['./menu-shortcut.component.css']
})
export class MenuShortcutComponent {

  navigationRoutes = [];
  open = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.navigationRoutes = this.route.routeConfig.children;
  }

  @HostListener('window:click')
  handleDialogClose() {
    this.open = false;
  }

  onDisplay(event) {
    this.open = !this.open;
    event.stopPropagation();
  }
}
