import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { extractMessages } from '../../presentation/i18n-tools';

export interface IndexPageRoute {
  name: string;
  description: string;
  page?: string;
}

const routesTranslations = {
  'Create your first Angular app': 'createFirstNgApp',
  'Templates': 'templates',
  'Dependency-Injection': 'dependencyInjection',
  'Component-Tree': 'componentTree',
  'Custom-Events': 'customEvents',
  'Angular is written in TypeScript, a superset of JavaScript. Learn TypeScript.': 'angularWrittenInTypescript',
  'Learn how to create and bootstrap your first Angular application': 'learnHowToBootstrapApp',
  'Learn how to use Angular templates': 'learnUsingTemplates',
  'Learn how to provide dependencies to your code instead of hard-coding them': 'learnToProvideDependencies',
  'Learn how to structure your app with reusable components': 'learnToStructureAppWithReusableComponents',
  'Learn to bind to events.': 'learnToBindToEvents'
};

@Component({
  selector: 'slides-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  routes: Array<IndexPageRoute>;
  @ViewChild('translations') translations;

  getMainPageRoutes() {
    const t = extractMessages(this.translations); // translations from the template
    return this.getPageRoutes('main').map(route => {
      return {
        ...route,
        name: t[routesTranslations[route.name]] || route.name,
        description: t[routesTranslations[route.description]] || route.description
      };
    });
  }

  getBonusPageRoutes() {
    return this.getPageRoutes('bonus');
  }

  getPageRoutes(page: string) {
    return this.routes.filter(route => route.page === page);
  }

  constructor(@Inject('ROUTES') routes: Array<IndexPageRoute>) {
    this.routes = routes.filter(route => route.name);
  }

  ngOnInit() {
  }

}
