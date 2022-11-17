import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MenuShortcutWidgetComponent } from './menu-shortcut-widget.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatMenuModule],
  declarations: [MenuShortcutWidgetComponent],
  exports: [MenuShortcutWidgetComponent],
})
export class MenuShortcutWidgetModule {}
