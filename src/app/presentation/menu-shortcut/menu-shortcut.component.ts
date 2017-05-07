import {Component, HostListener, Inject} from '@angular/core';

@Component({
  selector: 'slides-menu-shortcut',
  templateUrl: './menu-shortcut.component.html',
  styleUrls: ['./menu-shortcut.component.css']
})
export class MenuShortcutComponent {
  routes: { name: string, description: string };
  open = false;

  constructor(@Inject('ROUTES') routes) {
    this.routes = routes.filter(route => route.name);
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
