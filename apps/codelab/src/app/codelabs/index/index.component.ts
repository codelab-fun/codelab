import { Component, ViewChild } from '@angular/core';

import { menuRoutes } from '../angular/angular-routing.module';

@Component({
  selector: 'codelab-slides-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  @ViewChild('translations') translations;

  showContents: boolean;
  menuRoutes = menuRoutes;
}
