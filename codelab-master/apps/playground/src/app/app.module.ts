import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { monacoReady } from '@codelab/code-demos';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';


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
      import('./quiz/routing/quiz-routing.module').then(m => m.QuizRoutingModule)
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
    HttpClientModule,
    AngularFireApp,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatGridListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTooltipModule
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
