import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { monacoReady } from '@codelab/code-demos';
import { environment } from '../../../codelab/src/environments/environment';

import { AppComponent } from './app.component';

export const AngularFireApp = AngularFireModule.initializeApp(
  environment.firebaseConfig
);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireApp,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('./modules/rxjs/rxjs.module').then((_) => _.RxjsModule),
        },
      ],
      { initialNavigation: 'enabled', relativeLinkResolution: 'legacy' }
    ),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useValue: monacoReady,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
