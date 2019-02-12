import { Component } from '@angular/core';

import { menuRoutes } from '../../../codelabs/angular/angular-routing.module';


@Component({
  selector: 'codelab-menu-shortcut-content',
  templateUrl: './menu-shortcut-content.component.html',
  styleUrls: ['./menu-shortcut-content.component.css']
})
export class MenuShortcutContentComponent {

  menuRoutes = menuRoutes;

}
