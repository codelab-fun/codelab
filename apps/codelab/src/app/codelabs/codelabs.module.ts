import { APP_INITIALIZER, NgModule } from '@angular/core';

import { OverlayModule } from '@angular/cdk/overlay';

import { monacoReady } from '@codelab/code-demos/src/lib/shared/monaco-config.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';

import { CodelabsRoutingModule } from './codelabs-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FeedbackModule } from '@codelab/feedback';
import { FirebaseLoginModule } from '@codelab/firebase-login/src';

import { SlidesModule } from '@codelab/slides';
import { ButtonsNavBarModule } from '../components/buttons-nav-bar/buttons-nav-bar.module';


@NgModule({
  declarations: [
    IndexComponent,
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SlidesModule,
    CodelabsRoutingModule,
    FirebaseLoginModule,
    OverlayModule,

    ButtonsNavBarModule
  ],
  bootstrap: [AppComponent],
  // TODO(kirjs): Move this out of the main page
  providers: [
    {
      provide: APP_INITIALIZER,
      useValue: monacoReady,
      multi: true
    }
  ]
})
export class CodelabsModule {
}
