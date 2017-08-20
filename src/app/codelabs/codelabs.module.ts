import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MonacoConfigService } from '../exercise/services/monaco-config.service';
import { ExerciseModule } from '../exercise/exercise.module';
import { TooltipsModule } from '../tooltips/tooltips.module';
import { IndexComponent } from './index/index.component';
import { PresentationModule } from '../presentation/presentation.module';
import { FeedbackModule } from 'app/feedback/feedback.module';
import { environment } from '../../environments/environment';

export let routes = [
  {
    path: 'typescript',
    loadChildren: './typescript/typescript/typescript.module#TypescriptModule',
    name: 'Typescript',
    description: 'Angular is written in TypeScript, a superset of JavaScript. Learn TypeScript.',
    page: 'main',
    prod: true
  },
  {
    path: 'create-first-app',
    loadChildren: './angular/create-first-app/create-first-app.module#CreateFirstAppModule',
    name: 'Create your first Angular app',
    description: 'Learn how to create and bootstrap your first Angular application',
    page: 'main',
    prod: true
  },
  {
    path: 'templates',
    loadChildren: './angular/templates/templates.module#TemplatesModule',
    name: 'Templates',
    description: 'Learn how to use Angular templates',
    page: 'main',
    prod: true

  },
  {
    path: 'dependency-injection',
    loadChildren: './angular/dependency-injection/dependency-injection.module#DependencyInjectionModule',
    name: 'Dependency-Injection',
    description: 'Learn how to provide dependencies to your code instead of hard-coding them',
    page: 'main',
    prod: true
  },
  {
    path: 'component-tree',
    loadChildren: './angular/component-tree/component-tree.module#ComponentTreeModule',
    name: 'Component-Tree',
    description: 'Learn how to structure your app with reusable components',
    page: 'main',
    prod: true
  },
  {
    path: 'custom-events',
    loadChildren: './angular/custom-events/custom-events.module#CustomEventsModule',
    name: 'Custom-Events (work in progress)',
    description: 'Learn to bind to events.',
    page: 'main'
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
    description: 'Learn how pipes transform input values to output values for display in a view',
    page: 'bonus',
    prod: true
  },
  {
    path: 'vue-intro',
    loadChildren: './vue/intro/intro.module#VueModule',
    name: 'vue',
    description: 'Learn how pipes transform input values to output values for display in a view',
    page: 'vue'
  },
  {
    path: 'react-intro',
    loadChildren: './react/intro/intro.module#ReactModule',
    name: 'react',
    description: 'Learn some React. It\'s easier than Angular',
    page: 'react'
  },
  {
    path: 'experiments',
    loadChildren: './extra/experiments/experiments.module#ExperimentsModule',
    page: 'bonus'
  },
  {
    path: 'visual-studio-code',
    loadChildren: './extra/visual-studio-code/visual-studio-code.module#VisualStudioCodeModule',
    name: 'Visual-Studio-Code (Optional)',
    description: 'Find out why Visual Studio Code is your friend',
    page: 'bonus'
  },
  {
    path: 'feedback-page',
    loadChildren: './extra/feedback-page/feedback-page.module#FeedbackPageModule'
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

export function monacoReady() {
  return MonacoConfigService.monacoReady;
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PresentationModule,
    ExerciseModule,
    RouterModule.forRoot(routes),
    TooltipsModule,
    FeedbackModule
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
    }],
  bootstrap: [AppComponent]
})
export class CodelabsModule {
}
