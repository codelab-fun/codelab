import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonWithMenuModule } from '@codelab/utils';
import { MenuShortcutWidgetComponent } from './menu-shortcut-widget.component';

@NgModule({
  imports: [CommonModule, RouterModule, ButtonWithMenuModule],
  declarations: [MenuShortcutWidgetComponent],
  exports: [MenuShortcutWidgetComponent, ButtonWithMenuModule]
})
export class MenuShortcutWidgetModule {}
