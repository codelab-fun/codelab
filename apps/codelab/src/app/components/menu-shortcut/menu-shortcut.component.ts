import { Component, HostListener, Inject } from '@angular/core';

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
  routes: MenuShortcutRoute[];
  open = false;

  constructor(@Inject('ROUTES') routes: Array<MenuShortcutRoute>) {
    this.routes = routes
      .filter(route => route.page === 'main')
      .filter(route => route.name);
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
