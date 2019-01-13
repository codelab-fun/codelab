import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { monacoReady } from '../../../../../libs/exercise/src/lib/services/monaco-config.service';
import { ExerciseModule } from '../../../../../libs/exercise/src/lib/exercise.module';
import { TooltipsModule } from '../../../../../libs/tooltips/src/lib/tooltips.module';
import { IndexComponent } from './index/index.component';
import { PresentationModule } from '../../../../../libs/presentation/src/lib/presentation.module';

import { environment } from '../../environments/environment';
import { NxModule } from '@nrwl/nx';
import { FeedbackModule } from '../../../../../libs/feedback/src/lib/feedback.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlidesModule } from '../../../../../libs/slides/src';

export let routes = [
  {
    path: 'typescript',
    loadChildren: './typescript/typescript/typescript.module#TypescriptModule',
    name: 'TypeScript',
    description: 'Angular is written in TypeScript, a superset of JavaScript. Learn TypeScript.',
    page: 'main',
    prod: true,
    translationIds: ['', 'angularWrittenInTypescript']
  },
  {
    path: 'create-first-app',
    loadChildren: './angular/create-first-app/create-first-app.module#CreateFirstAppModule',
    name: 'Create your first Angular app',
    description: 'Learn how to create and bootstrap your first Angular application',
    page: 'main',
    prod: true,
    translationIds: ['createFirstNgApp', 'learnHowToBootstrapApp']
  },
  {
    path: 'templates',
    loadChildren: './angular/templates/templates.module#TemplatesModule',
    name: 'Templates',
    description: 'Learn how to use Angular templates',
    page: 'main',
    prod: true,
    translationIds: ['templates', 'learnUsingTemplates']
  },
  {
    path: 'dependency-injection',
    loadChildren: './angular/dependency-injection/dependency-injection.module#DependencyInjectionModule',
    name: 'Dependency-Injection',
    description: 'Learn how to provide dependencies to your code instead of hard-coding them',
    page: 'main',
    prod: true,
    translationIds: ['dependencyInjection', 'learnToProvideDependencies']
  },
  {
    path: 'component-tree',
    loadChildren: './angular/component-tree/component-tree.module#ComponentTreeModule',
    name: 'Component-Tree',
    description: 'Learn how to structure your app with reusable components',
    page: 'main',
    prod: true,
    translationIds: ['componentTree', 'learnToStructureAppWithReusableComponents']
  },
  /*
  {
    path: 'custom-events',
    loadChildren: './angular/custom-events/custom-events.module#CustomEventsModule',
    name: 'Custom-Events (work in progress)',
    description: 'Learn to bind to events.',
    page: 'bonus',
    translationIds: ['customEvents', 'learnToBindToEvents']
  },*/
  {
    path: 'router',
    loadChildren: './angular/router/router.module#RouterCodelabModule',
    name: 'Angular Router',
    description: '[🚧 Work In Progress] Learn how to add routes to your Angular application',
    page: 'main',
    prod: true
  }, {
    path: 'material',
    loadChildren: './angular/material/material.module#MaterialCodelabModule',
    name: 'Angular Material',
    description: '[🚧 Work In Progress] Learn how to use Angular Material',
    page: 'main',
    prod: true
  }, {
    path: 'forms',
    loadChildren: './angular/forms/forms.module#FormsCodelabModule',
    name: 'Forms',
    description: '[🚧 Work In Progress] Learn how to add Forms to your app',
    page: 'main',
    prod: true
  }, {
    path: 'angular-cli',
    loadChildren: './angular/angular-cli/angular-cli.module#AngularCliModule',
    name: 'angular-cli',
    description: '[🚧 Work In Progress] Learn how to quickly start working with angular',
    page: 'main',
    prod: true
  },
  {
    path: 'pipes',
    loadChildren: './angular/pipes/pipes.module#PipesModule',
    name: 'Pipes',
    description: 'Learn how pipes transform input values to output values for display in a view',
    page: 'bonus'
  },
  {
    path: 'structural-directives',
    loadChildren: './angular/structural-directives/structural-directives.module#StructuralDirectivesModule',
    name: 'Structural Directives',
    description: 'Learn about structural directives in angular',
    page: 'bonus',
    prod: true
  },
  {
    path: 'code-playground',
    loadChildren: './extra/code-playground/code-playground.module#CodePlaygroundModule',
    name: 'code-playground',
    description: 'Learn how pipes transform input values to output values for display in a view',
    page: 'extra'
  },
  {
    path: '',
    component: IndexComponent,
    prod: true
  }
];

if (environment.production) {
  routes = routes.filter(r => r['prod']);
}


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    PresentationModule,
    ExerciseModule,
    SlidesModule,
    RouterModule.forRoot(routes),
    TooltipsModule,
    FeedbackModule,
    NxModule.forRoot()
  ],
  providers: [
    {
      provide: 'ROUTES',
      useValue: routes
    },
    {
      provide: APP_INITIALIZER,
      useValue: monacoReady,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class CodelabsModule {
}
