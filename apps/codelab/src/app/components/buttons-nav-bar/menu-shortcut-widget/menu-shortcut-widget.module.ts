import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material';
import { MenuShortcutWidgetComponent } from './menu-shortcut-widget.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatMenuModule],
  declarations: [MenuShortcutWidgetComponent],
  exports: [MenuShortcutWidgetComponent]
})
export class MenuShortcutWidgetModule {}
