import { Component, Inject } from '@angular/core';
import { MENU_ROUTES } from '../../../common';

@Component({
  selector: 'codelab-menu-shortcut-widget',
  templateUrl: './menu-shortcut-widget.component.html',
  styleUrls: ['./menu-shortcut-widget.component.css']
})
export class MenuShortcutWidgetComponent {
  constructor(@Inject(MENU_ROUTES) readonly menuRoutes) {}
}
