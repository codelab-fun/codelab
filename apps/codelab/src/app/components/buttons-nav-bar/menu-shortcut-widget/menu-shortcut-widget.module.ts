import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuShortcutWidgetComponent } from './menu-shortcut-widget.component';
import { ButtonWithMenuModule } from '../button-with-menu/button-with-menu.module';

@NgModule({
  imports: [CommonModule, RouterModule, ButtonWithMenuModule],
  declarations: [MenuShortcutWidgetComponent],
  exports: [MenuShortcutWidgetComponent, ButtonWithMenuModule]
})
export class MenuShortcutWidgetModule {
}
