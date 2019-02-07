import { Component, HostListener } from '@angular/core';

import { environment } from '../../../environments/environment';

import { routes as angularComponentRoutes } from '../../codelabs/angular/angular-routing.module';

@Component({
  selector: 'codelab-menu-shortcut',
  templateUrl: './menu-shortcut.component.html',
  styleUrls: ['./menu-shortcut.component.css']
})
export class MenuShortcutComponent {

  open = false;

  getNavigationRoutes() {
    return environment.production ?
      angularComponentRoutes[0]['children'].filter(x => x['prod']) :
      angularComponentRoutes[0]['children'];
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
