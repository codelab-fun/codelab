import { Component } from '@angular/core';
import { menuRoutes } from '../../../codelabs/angular/angular-routing.module';

@Component({
  selector: 'codelab-menu-shortcut-widget',
  templateUrl: './menu-shortcut-widget.component.html',
  styleUrls: ['./menu-shortcut-widget.component.css']
})
export class MenuShortcutWidgetComponent {
  menuRoutes = menuRoutes;
}
