import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';


import { SlidesModule } from '@slides/slides';
import { FeedbackModule } from '@slides/feedback';
import { IndexComponent } from './index.component';


export let routes = [
  {
    path: 'typescript',
    loadChildren: '../codelab/typescript/typescript.module#TypescriptModule',
    name: 'TypeScript',
    description: 'Angular is written in TypeScript, a superset of JavaScript. Learn TypeScript.',
    page: 'main',
    prod: true,
    translationIds: ['', 'angularWrittenInTypescript']
  },
  {
    path: 'create-first-app',
    loadChildren: '../codelab/create-first-app/create-first-app.module#CreateFirstAppModule',
    name: 'Create your first Angular app',
    description: 'Learn how to create and bootstrap your first Angular application',
    page: 'main',
    prod: true,
    translationIds: ['createFirstNgApp', 'learnHowToBootstrapApp']
  },
  {
    path: 'templates',
    loadChildren: '../codelab/templates/templates.module#TemplatesModule',
    name: 'Templates',
    description: 'Learn how to use Angular templates',
    page: 'main',
    prod: true,
    translationIds: ['templates', 'learnUsingTemplates']
  },
  {
    path: 'dependency-injection',
    loadChildren: '../codelab/dependency-injection/dependency-injection.module#DependencyInjectionModule',
    name: 'Dependency-Injection',
    description: 'Learn how to provide dependencies to your code instead of hard-coding them',
    page: 'main',
    prod: true,
    translationIds: ['dependencyInjection', 'learnToProvideDependencies']
  },
  {
    path: 'component-tree',
    loadChildren: '../codelab/component-tree/component-tree.module#ComponentTreeModule',
    name: 'Component-Tree',
    description: 'Learn how to structure your app with reusable components',
    page: 'main',
    prod: true,
    translationIds: ['componentTree', 'learnToStructureAppWithReusableComponents']
  },
  /*
  {
    path: 'custom-events',
    loadChildren: '../codelab/custom-events/custom-events.module#CustomEventsModule',
    name: 'Custom-Events (work in progress)',
    description: 'Learn to bind to events.',
    page: 'bonus',
    translationIds: ['customEvents', 'learnToBindToEvents']
  },*/
  {
    path: 'router',
    loadChildren: '../codelab/router/router.module#RouterCodelabModule',
    name: 'Angular Router',
    description: '[🚧 Work In Progress] Learn how to add routes to your Angular application',
    page: 'main',
    prod: true
  }, {
    path: 'material',
    loadChildren: '../codelab/material/material.module#MaterialCodelabModule',
    name: 'Angular Material',
    description: '[🚧 Work In Progress] Learn how to use Angular Material',
    page: 'main',
    prod: true
  }, {
    path: 'forms',
    loadChildren: '../codelab/forms/forms.module#FormsCodelabModule',
    name: 'Forms',
    description: '[🚧 Work In Progress] Learn how to add Forms to your app',
    page: 'main',
    prod: true
  }, {
    path: 'angular-cli',
    loadChildren: '../codelab/angular-cli/angular-cli.module#AngularCliModule',
    name: 'angular-cli',
    description: '[🚧 Work In Progress] Learn how to quickly start working with angular',
    page: 'main',
    prod: true
  },
  {
    path: 'pipes',
    loadChildren: '../codelab/pipes/pipes.module#PipesModule',
    name: 'Pipes',
    description: 'Learn how pipes transform input values to output values for display in a view',
    page: 'bonus'
  },
  {
    path: '',
    component: IndexComponent,
    prod: true
  }
];

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    SlidesModule,
    RouterModule.forRoot(routes, {initialNavigation: 'enabled'}),
    FeedbackModule
  ], providers: [
    {
      provide: 'ROUTES',
      useValue: routes
    }
  ],
  declarations: [AppComponent, IndexComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
