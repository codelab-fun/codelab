import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { monacoReady } from '@codelab/exercise/src/lib/services/monaco-config.service';

const routes = [
  {
    path: 'binary',
    loadChildren: './modules/binary/binary.module#BinaryModule',
    name: 'Binary',
    description: 'Learn about Binary in JS',
    page: 'bonus',
    prod: true
  },
  {
    path: 'gomoku',
    loadChildren: './modules/gomoku/gomoku.module#GomokuModule',
    name: 'Gomoku',
    description: 'Gomoku',
    page: 'bonus',
    prod: true
  },
  {
    path: 'cellular-automation',
    loadChildren:
      './modules/cellular-automation/cellular-automation.module#CellularAutomationModule',
    name: 'Image inclusion',
    description: 'Image inclusion'
  },
  {
    path: 'feedback-page',
    loadChildren:
      './modules/feedback-page/feedback-page.module#FeedbackPageModule',
    name: 'Feedback page',
    description: 'Feedback page'
  },
  {
    path: 'ii',
    loadChildren: './modules/ii/ii.module#IiModule',
    name: 'Image inclusion',
    description: 'Image inclusion'
  },
  {
    path: 'music',
    loadChildren: './modules/music/music.module#MusicModule',
    name: 'Music',
    description: 'Musicja'
  },
  {
    path: 'svg',
    loadChildren: './modules/svg/svg.module#SvgModule',
    name: 'Svg + Angular',
    description: 'SVG '
  },
  {
    path: 'regex',
    loadChildren: './modules/regex/regex.module#RegexModule',
    name: 'Regex',
    description: 'Regex '
  },
  {
    path: 'ast',
    loadChildren: './modules/ast/ast.module#AstModule',
    name: 'Ast + Angular',
    description: 'SVG '
  },
  {
    path: '',
    loadChildren: './modules/home/home.module#HomeModule',
    name: 'Home',
    description: 'Home'
  },
  {
    path: 'test',
    loadChildren: './modules/test/test.module#TestModule',
    name: 'Home',
    description: 'Home'
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useValue: monacoReady,
      multi: true
    },
    {
      provide: 'ROUTES',
      useValue: []
    }
  ],
  bootstrap: [AppComponent]
})
export class KirjsModule {
}
