import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { monacoReady } from '@codelab/code-demos';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

const routes = [
  {
    path: '',
    redirectTo: 'code-sync',
    pathMatch: 'full'
  },
  {
    path: 'angular',
    loadChildren: () =>
      import('./playground/playground.module').then(m => m.PlaygroundModule)
  },
  {
    path: 'code-sync',
    loadChildren: () =>
      import('./code-sync/code-sync.module').then(m => m.CodeSyncModule)
  },
  {
    path: 'quiz',
    loadChildren: () =>
      import('./quiz/app.module').then(m => m.AppModule)
  }
];

export const AngularFireApp = AngularFireModule.initializeApp(
  environment.firebaseConfig
);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    AngularFireApp,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useValue: monacoReady,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
