import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MenuGithubContentComponent } from './menu-github-content/menu-github-content.component';
import { MenuGithubWidgetComponent } from './menu-github-widget/menu-github-widget.component';


@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [MenuGithubContentComponent, MenuGithubWidgetComponent],
  exports: [MenuGithubContentComponent, MenuGithubWidgetComponent],
  entryComponents: [MenuGithubContentComponent]
})
export class MenuGithubModule {
}
