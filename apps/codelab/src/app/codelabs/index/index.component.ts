import { Component, ViewChild } from '@angular/core';

import { routes as angularComponentRoutes } from '../angular/angular-routing.module';


@Component({
  selector: 'codelab-slides-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  @ViewChild('translations') translations;

  showContents: boolean;

  getMainPageRoutes() {
    return angularComponentRoutes[0]['children'];
  }

}
