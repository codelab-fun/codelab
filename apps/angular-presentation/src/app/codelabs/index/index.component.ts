import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { extractMessages } from '../../../../../../libs/presentation/src/lib/i18n-tools';
import { MenuShortcutRoute } from '../../../../../../libs/presentation/src/lib/menu-shortcut/menu-shortcut.component';



@Component({
  selector: 'slides-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  routes: Array<MenuShortcutRoute>;
  @ViewChild('translations') translations;

  getMainPageRoutes() {
    const t = extractMessages(this.translations); // translations from the template
    return this.getPageRoutes('main').map(route => {
      if (route.translationIds) {
        route.name = t[route.translationIds[0]] || route.name;
        route.description = t[route.translationIds[1]] || route.name;
      }
      return route;
    });
  }

  getBonusPageRoutes() {
    return this.getPageRoutes('bonus');
  }

  getPageRoutes(page: string) {
    return this.routes.filter(route => route.page === page);
  }

  constructor(@Inject('ROUTES') routes: Array<MenuShortcutRoute>) {
    this.routes = routes.filter(route => route.name);
  }

  ngOnInit() {
  }

}
