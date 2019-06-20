import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { monacoReady } from '@codelab/code-demos';
import { MatButtonModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CreateSnippetComponent } from './create-snippet/create-snippet.component';
import { CreateSnippetModule } from './create-snippet/create-snippet.module';
import { environment } from '../../../codelab/src/environments/environment';
import { AngularFireModule } from '@angular/fire';

export const angularFire = AngularFireModule.initializeApp(
  environment.firebaseConfig
);

const routes: Routes = [
  {
    path: '',
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
    HttpClientModule,
    CreateSnippetModule
  ],
  declarations: [AppComponent],
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
