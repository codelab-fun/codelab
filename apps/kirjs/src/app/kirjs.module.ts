import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { monacoReady } from '@codelab/code-demos';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { environment } from '../../../codelab/src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

export const angularFire = AngularFireModule.initializeApp(
  environment.firebaseConfig
);

const routes = [
  {
    path: 'binary',
    loadChildren: () =>
      import('./modules/binary/binary.module').then(m => m.BinaryModule),
    name: 'Binary',
    description: 'Learn about Binary in JS',
    page: 'bonus',
    prod: true
  },
  {
    path: 'gomoku',
    loadChildren: () =>
      import('./modules/gomoku/gomoku.module').then(m => m.GomokuModule),
    name: 'Gomoku',
    description: 'Gomoku',
    page: 'bonus',
    prod: true
  },
  {
    path: 'cellular-automation',
    loadChildren: () =>
      import(
        './modules/cellular-automation/cellular-automation-routing.module'
      ).then(m => m.CellularAutomationRoutingModule),
    name: 'Image inclusion',
    description: 'Image inclusion'
  },
  {
    path: 'music',
    loadChildren: () =>
      import('./modules/music/music.module').then(m => m.MusicModule),
    name: 'Music',
    description: 'Music'
  },
  {
    path: 'webassembly',
    loadChildren: () =>
      import('./modules/webassembly/webassembly.module').then(
        m => m.WebassemblyModule
      ),
    name: 'webassembly',
    description: 'webassembly'
  },
  {
    path: 'svg',
    loadChildren: () =>
      import('./modules/svg/svg.module').then(m => m.SvgModule),
    name: 'Svg + Angular',
    description: 'SVG '
  },
  {
    path: 'regex',
    loadChildren: () =>
      import('./modules/regex/regex.module').then(m => m.RegexModule),
    name: 'Regex',
    description: 'Regex '
  },
  {
    path: 'ast',
    loadChildren: () =>
      import('./modules/ast/ast.module').then(m => m.AstModule),
    name: 'Ast + Angular',
    description: 'SVG '
  },
  {
    path: 'svg-race',
    loadChildren: () =>
      import('./modules/svg-race/svg-race.module').then(m => m.SvgRaceModule),
    name: 'SVG Race',
    description: 'SVG '
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule),
    name: 'Home',
    description: 'Home'
  },
  {
    path: 'sync',
    loadChildren: () =>
      import('./modules/sync/sync.module').then(m => m.SyncModule),
    name: 'Sync',
    description: 'Sync Session'
  },
  {
    path: 'stack',
    loadChildren: () =>
      import('./modules/stack/stack.module').then(m => m.StackModule),
    name: 'Stack Module',
    description: 'stack'
  },
  {
    path: 'sync',
    loadChildren: () =>
      import('./modules/sync/sync.module').then(m => m.SyncModule),
    name: 'Sync',
    description: 'Sync Session'
  },
  {
    path: 'test',
    loadChildren: () =>
      import('./modules/test/test.module').then(m => m.TestModule),
    name: 'Home',
    description: 'Home'
  },
  {
    path: 'qna',
    loadChildren: () =>
      import('./modules/qna/qna.module').then(m => m.QnaModule),
    name: 'Q&A'
  },
  {
    path: 'msk',
    loadChildren: () =>
      import('./modules/msk/msk.module').then(m => m.MskModule),
    name: 'Angular Moscow Meetup'
  },
  {
    path: 'stack',
    loadChildren: () =>
      import('./modules/stack/stack-routing.module').then(
        m => m.StackRoutingModule
      ),
    name: 'Stack Module',
    description: 'stack'
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    angularFire
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
    },
    {
      provide: APP_INITIALIZER,
      useValue: monacoReady,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class KirjsModule {}
