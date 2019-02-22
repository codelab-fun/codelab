import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonWithMenuModule } from '@codelab/utils';
import { MenuGithubWidgetComponent } from './menu-github-widget.component';

@NgModule({
  imports: [CommonModule, ButtonWithMenuModule],
  declarations: [MenuGithubWidgetComponent],
  exports: [MenuGithubWidgetComponent, ButtonWithMenuModule]
})
export class MenuGithubWidgetModule {}
