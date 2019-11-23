import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { monacoReady } from '@codelab/code-demos';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './components/login/login.module';
import { menuRoutes } from './codelabs/angular/angular-routing.module';
import { MENU_ROUTES } from './common';
import { environment } from '../environments/environment';
import { NotFoundModule } from './components/not-found/not-found.module';
import { MatButtonModule } from '@angular/material/button';
import { DirectivesModule } from './directives/directives.module';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  imports: [
    AppRoutingModule,
    LoginModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NotFoundModule,
    MatButtonModule,
    DirectivesModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  declarations: [AppComponent],
  providers: [
    { provide: MENU_ROUTES, useValue: menuRoutes },
    { provide: APP_INITIALIZER, useValue: monacoReady, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
