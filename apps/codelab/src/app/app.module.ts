import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { monacoReady } from '@codelab/code-demos';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppComponent } from './app.compoent';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginModule } from './components/login/login.module';
import { menuRoutes } from './codelabs/angular/angular-routing.module';
import { MENU_ROUTES } from './common';
import { environment } from '../environments/environment';

const BROWSER_MODULES = [BrowserModule, BrowserAnimationsModule];
const FIRE_MODULES = [
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule,
  AngularFireDatabaseModule
];

@NgModule({
  imports: [AppRoutingModule, LoginModule, BROWSER_MODULES, FIRE_MODULES],
  declarations: [AppComponent, NotFoundComponent],
  providers: [
    { provide: MENU_ROUTES, useValue: menuRoutes },
    { provide: APP_INITIALIZER, useValue: monacoReady, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
