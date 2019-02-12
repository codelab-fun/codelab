import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MenuShortcutContentComponent } from './menu-shortcut-content/menu-shortcut-content.component';
import { MenuShortcutWidgetComponent } from './menu-shortcut-widget/menu-shortcut-widget.component';


@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [MenuShortcutContentComponent, MenuShortcutWidgetComponent],
  exports: [MenuShortcutContentComponent, MenuShortcutWidgetComponent],
  entryComponents: [MenuShortcutContentComponent]
})
export class MenuShortcutModule {
}
