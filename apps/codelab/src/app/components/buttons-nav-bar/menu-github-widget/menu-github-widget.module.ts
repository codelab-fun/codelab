import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuGithubWidgetComponent } from './menu-github-widget.component';
import { ButtonWithMenuModule } from '../button-with-menu/button-with-menu.module';

@NgModule({
  imports: [CommonModule, ButtonWithMenuModule],
  declarations: [MenuGithubWidgetComponent],
  exports: [MenuGithubWidgetComponent, ButtonWithMenuModule]
})
export class MenuGithubWidgetModule {
}
