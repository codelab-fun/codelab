import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularRoutesComponent } from '../../components/angular-routes/angular-routes.component';
import { FullLayoutComponent } from '../../containers/full-layout';
import { environment } from '../../../environments/environment';
import { MENU_ROUTES, MenuRoutes } from '../../common';

const routes: MenuRoutes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: '',
        component: AngularRoutesComponent
      },
      {
        path: 'typescript',
        loadChildren: () =>
          import('./typescript/typescript.module').then(
            m => m.TypeScriptModule
          ),
        name: 'TypeScript',
        description:
          'Angular is written in TypeScript, a superset of JavaScript. Learn TypeScript',
        page: 'typescript',
        prod: true
      },
      {
        path: 'create-first-app',
        loadChildren: () =>
          import('./create-first-app/create-first-app.module').then(
            m => m.CreateFirstAppModule
          ),
        name: 'Create your first Angular app',
        description:
          'Learn how to create and bootstrap your first Angular application',
        page: 'main',
        prod: true,
        translationIds: ['createFirstNgApp', 'learnHowToBootstrapApp']
      },
      {
        path: 'templates',
        loadChildren: () =>
          import('./templates/templates.module').then(m => m.TemplatesModule),
        name: 'Templates',
        description: 'Learn how to use Angular templates',
        page: 'main',
        prod: true,
        translationIds: ['templates', 'learnUsingTemplates']
      },
      {
        path: 'dependency-injection',
        loadChildren: () =>
          import('./dependency-injection/dependency-injection.module').then(
            m => m.DependencyInjectionModule
          ),
        name: 'Dependency-Injection',
        description:
          'Learn how to provide dependencies to your code instead of hard-coding them',
        page: 'main',
        prod: true,
        translationIds: ['dependencyInjection', 'learnToProvideDependencies']
      },
      {
        path: 'component-tree',
        loadChildren: () =>
          import('./component-tree/component-tree.module').then(
            m => m.ComponentTreeModule
          ),
        name: 'Component-Tree',
        description: 'Learn how to structure your app with reusable components',
        page: 'main',
        prod: true,
        translationIds: [
          'componentTree',
          'learnToStructureAppWithReusableComponents'
        ]
      },
      // {
      //   path: 'custom-events',
      //   loadChildren: './custom-events/custom-events.module#CustomEventsModule',
      //   name: 'Custom-Events (work in progress)',
      //   description: 'Learn to bind to events.',
      //   page: 'bonus',
      //   translationIds: ['customEvents', 'learnToBindToEvents']
      // },
      {
        path: 'router',
        loadChildren: () =>
          import('./router/router.module').then(m => m.RouterCodelabModule),
        name: 'Angular Router',
        description: 'Learn how to add routes to your Angular application',
        page: 'main',
        prod: true
      },
      {
        path: 'material',
        loadChildren: () =>
          import('./material/material.module').then(
            m => m.MaterialCodelabModule
          ),
        name: 'Angular Material',
        description: 'Learn how to use Angular Material',
        page: 'main',
        prod: true
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./forms/forms.module').then(m => m.FormsCodelabModule),
        name: 'Forms',
        description: 'Learn how to add Forms to your app',
        page: 'main',
        prod: true
      },
      {
        path: 'angular-cli',
        loadChildren: () =>
          import('./angular-cli/angular-cli.module').then(
            m => m.AngularCliModule
          ),
        name: 'Angular-cli',
        description: 'Learn how to quickly start working with angular',
        page: 'main',
        prod: true
      },
      {
        path: 'pipes',
        loadChildren: () =>
          import('./pipes/pipes.module').then(m => m.PipesModule),
        name: 'Pipes',
        description:
          'Learn how pipes transform input values to output values for display in a view',
        page: 'bonus',
        prod: false
      },
      {
        path: 'structural-directives',
        loadChildren: () =>
          import('./structural-directives/structural-directives.module').then(
            m => m.StructuralDirectivesModule
          ),
        name: 'Structural Directives',
        description: 'Learn about structural directives in angular',
        page: 'bonus',
        prod: true
      },
      {
        path: 'playground',
        loadChildren: () =>
          import('./playground/playground.module').then(
            m => m.PlaygroundModule
          ),
        page: 'bonus',
        prod: true
      }
    ]
  }
];

const isProd = environment.production;
export const menuRoutes = routes[0].children
  .filter(x => x.page === 'main')
  // Hide non-prod routes in prod
  .filter(x => !isProd || x.prod);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: MENU_ROUTES, useValue: menuRoutes }]
})
export class AngularRoutingModule {}
