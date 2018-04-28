import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MonacoConfigService } from '../../../../../libs/exercise/src/services/monaco-config.service';
import { ExerciseModule } from '../../../../../libs/exercise/src/exercise.module';
import { TooltipsModule } from '../tooltips/tooltips.module';
import { IndexComponent } from './index/index.component';
import { SlidesModule } from '../../../../../libs/slides/src/slides.module';
import { FeedbackModule } from '../../../../../libs/feedback/src/feedback.module';
import { environment } from '../../environments/environment';

export let routes = [
  {
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
    SlidesModule,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class CodelabsModule {
}
