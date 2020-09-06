import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { monacoReady } from '@codelab/code-demos';
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
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: PullRequestsListComponent },
  { path: 'new/:repoName/:repoOwner', component: CreateSnippetComponent },
  {
    path: 'new/:repoName/:repoOwner/:pullNumber',
    component: CreateSnippetComponent
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
  declarations: [AppComponent, PullRequestsListComponent],
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
