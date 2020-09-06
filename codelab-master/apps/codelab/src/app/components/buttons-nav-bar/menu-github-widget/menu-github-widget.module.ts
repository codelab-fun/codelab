import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MenuGithubWidgetComponent } from './menu-github-widget.component';

@NgModule({
  imports: [CommonModule, MatMenuModule],
  declarations: [MenuGithubWidgetComponent],
  exports: [MenuGithubWidgetComponent]
})
export class MenuGithubWidgetModule {}
