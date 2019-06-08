import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { monacoReady } from '@codelab/code-demos';
import { MatButtonModule, MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CreateSnippetComponent } from './create-snippet/create-snippet.component';
import { CreateSnippetModule } from './create-snippet/create-snippet.module';
import { environment } from '../../../codelab/src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { PullRequestsListComponent } from './pull-requests-list/pull-requests-list.component';

export const angularFire = AngularFireModule.initializeApp(
  environment.firebaseConfig
);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'add-edit-snippet',
    component: CreateSnippetComponent,
  },
  {
    path: 'list',
    component: PullRequestsListComponent
  }
];

@NgModule({
  imports: [
    angularFire,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    CreateSnippetModule
  ],
  declarations: [
    AppComponent,
    PullRequestsListComponent
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
