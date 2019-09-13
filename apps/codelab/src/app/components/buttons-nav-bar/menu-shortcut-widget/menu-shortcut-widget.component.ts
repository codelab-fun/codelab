import { Component, Inject, Optional } from '@angular/core';
import { MENU_ROUTES } from '../../../codelabs/angular/common';

@Component({
  selector: 'codelab-menu-shortcut-widget',
  templateUrl: './menu-shortcut-widget.component.html',
  styleUrls: ['./menu-shortcut-widget.component.css']
})
export class MenuShortcutWidgetComponent {
  constructor(
    @Optional() @Inject(MENU_ROUTES) readonly menuRoutes
  ) {
  }
}
