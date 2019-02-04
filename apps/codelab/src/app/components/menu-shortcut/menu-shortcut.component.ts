import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'codelab-menu-shortcut',
  templateUrl: './menu-shortcut.component.html',
  styleUrls: ['./menu-shortcut.component.css']
})
export class MenuShortcutComponent {
  navigationRoutes = [];
  open = false;

  constructor(private route: ActivatedRoute) {
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
