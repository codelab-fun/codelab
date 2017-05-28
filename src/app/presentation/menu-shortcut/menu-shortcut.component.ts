import { Component, HostListener, Inject } from '@angular/core';
import { IndexPageRoute } from '../../demo/index/index.component';

@Component({
  selector: 'slides-menu-shortcut',
  templateUrl: './menu-shortcut.component.html',
  styleUrls: ['./menu-shortcut.component.css']
})

export class MenuShortcutComponent {
  routes: IndexPageRoute[];
  open = false;

  constructor(@Inject('ROUTES') routes: Array<IndexPageRoute>) {
    this.routes = routes.filter(route => route.page === 'main').filter(route => route.name);
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
