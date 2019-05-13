import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NxModule } from '@nrwl/nx';
import { monacoReady } from '@codelab/code-demos';
import { MatButtonModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CreateSnippetComponent } from './create-snippet/create-snippet.component';
import { CreateSnippetModule } from './create-snippet/create-snippet.module';
import { environment } from '../../../codelab/src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { SlugifyPipe } from './shared/slugify.pipe';


export const angularFire = AngularFireModule.initializeApp(
  environment.firebaseConfig
);


const routes: Routes = [
  {
    path: 'angular',
    loadChildren: './angular-thirty-seconds/angular-thirty-seconds.module#AngularThirtySecondsModule'
  },
  {
    path: '',
    component: CreateSnippetComponent,
  },
];

@NgModule({
  imports: [
    angularFire,
    BrowserModule,
    BrowserAnimationsModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes),
    MatButtonModule,
    HttpClientModule,
    CreateSnippetModule,
  ],
  declarations: [
    AppComponent,
    SlugifyPipe,
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
export class AppModule {
}
