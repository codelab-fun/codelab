import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NxModule } from '@nrwl/nx';
import { monacoReady } from '@codelab/code-demos';
import { HeaderComponent } from './angular-thirty-seconds/header/header.component';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'angular',
    pathMatch: 'full',
  },
  {
    path: 'angular',
    loadChildren: './angular-thirty-seconds/angular-thirty-seconds.module#AngularThirtySecondsModule'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes),
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
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
