import { Component, ViewChild } from '@angular/core';

import { routes as angularComponentRoutes } from '../angular/angular-routing.module';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'codelab-slides-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent {
  @ViewChild('translations') translations;

  showContents: boolean;

  getMainPageRoutes() {
    return environment.production ?
      angularComponentRoutes[0]['children'].filter(x => x['prod']) :
      angularComponentRoutes[0]['children'];
  }
}
