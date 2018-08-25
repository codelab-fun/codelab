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
    path: 'quiz',
    loadChildren: './extra/quiz/quiz.module#QuizModule',
    name: 'Quiz',
    description: 'Angular Quiz',
    page: 'bonus',
    prod: true
  },
  {
    path: 'svg',
    loadChildren: './extra/svg/svg.module#SvgModule',
    name: 'Svg',
    description: 'Angular Svg',
    page: 'bonus',
    prod: true
  },
  {
    path: 'ast',
    loadChildren: './extra/ast/ast.module#AstModule',
    name: 'Abstract Syntax Trees',
    description: 'Learn about ASTs',
    page: 'bonus',
    prod: true
  }, {
    path: 'binary',
    loadChildren: './extra/binary/binary.module#BinaryModule',
    name: 'Binary',
    description: 'Learn about Binary in JS',
    page: 'bonus',
    prod: true
  }, {
    path: 'cellular-automation',
    loadChildren: './extra/cellular-automation/cellular-automation.module#CellularAutomationModule',
    name: 'cellular-automation',
    description: 'Cellular automation',
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
  }, {
    path: 'gomoku',
    loadChildren: './extra/gomoku/gomoku.module#GomokuModule',
    page: 'bonus'
  }, {
    path: 'gomoku-print',
    loadChildren: './extra/gomoku-print/gomoku-print.module#GomokuPrintModule',
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
    path: 'rating-summary',
    loadChildren: './extra/rating-summary/rating-summary.module#RatingSummaryModule'
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
