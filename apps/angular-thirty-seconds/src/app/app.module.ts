import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NxModule } from '@nrwl/nx';
import { monacoReady } from '@codelab/code-demos';

const routes: Routes = [
  {path: '', redirectTo: 'angular-30-seconds', pathMatch: 'full'},
  {
    path: 'angular-30-seconds',
    loadChildren: './angular-thirty-seconds/angular-thirty-seconds.module#AngularThirtySecondsModule'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes)
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
export class AppModule {
}
