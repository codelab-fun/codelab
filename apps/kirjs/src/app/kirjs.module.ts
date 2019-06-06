import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/angular';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { monacoReady } from '@codelab/code-demos/src/lib/shared/monaco-config.service';

const routes = [
  {
    path: 'binary',
    loadChildren: () => import('./modules/binary/binary.module').then(m => m.BinaryModule),
    name: 'Binary',
    description: 'Learn about Binary in JS',
    page: 'bonus',
    prod: true
  },
  {
    path: 'gomoku',
    loadChildren: () => import('./modules/gomoku/gomoku.module').then(m => m.GomokuModule),
    name: 'Gomoku',
    description: 'Gomoku',
    page: 'bonus',
    prod: true
  },
  {
    path: 'cellular-automation',
    loadChildren:
      () => import('./modules/cellular-automation/cellular-automation.module').then(m => m.CellularAutomationModule),
    name: 'Image inclusion',
    description: 'Image inclusion'
  },
  {
    path: 'ii',
    loadChildren: () => import('./modules/ii/ii.module').then(m => m.IiModule),
    name: 'Image inclusion',
    description: 'Image inclusion'
  },
  {
    path: 'music',
    loadChildren: () => import('./modules/music/music.module').then(m => m.MusicModule),
    name: 'Music',
    description: 'Musicja'
  },
  {
    path: 'svg',
    loadChildren: () => import('./modules/svg/svg.module').then(m => m.SvgModule),
    name: 'Svg + Angular',
    description: 'SVG '
  },
  {
    path: 'regex',
    loadChildren: () => import('./modules/regex/regex.module').then(m => m.RegexModule),
    name: 'Regex',
    description: 'Regex '
  },
  {
    path: 'ast',
    loadChildren: () => import('./modules/ast/ast.module').then(m => m.AstModule),
    name: 'Ast + Angular',
    description: 'SVG '
  },
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    name: 'Home',
    description: 'Home'
  },
  {
    path: 'test',
    loadChildren: () => import('./modules/test/test.module').then(m => m.TestModule),
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
export class KirjsModule {}
