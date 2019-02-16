import { Component, HostListener } from '@angular/core';

import { menuRoutes } from '../../codelabs/angular/angular-routing.module';


@Component({
  selector: 'codelab-menu-shortcut',
  templateUrl: './menu-shortcut.component.html',
  styleUrls: ['./menu-shortcut.component.css']
})
export class MenuShortcutComponent {

  open = false;
  menuRoutes = menuRoutes;

  @HostListener('window:click')
  handleDialogClose() {
    this.open = false;
  }

  onDisplay(event) {
    this.open = !this.open;
    event.stopPropagation();
  }
}
