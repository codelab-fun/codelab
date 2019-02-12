import { APP_INITIALIZER, NgModule } from '@angular/core';

import { OverlayModule } from '@angular/cdk/overlay';

import { monacoReady } from '@codelab/code-demos/src/lib/shared/monaco-config.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';

import { CodelabsRoutingModule } from './codelabs-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FeedbackModule } from '@codelab/feedback';
import { MenuShortcutModule } from '../components/menu-shortcut/menu-shortcut.module';
import { MenuGithubModule } from '../components/menu-github/menu-github.module';
import { FirebaseLoginModule } from '@codelab/firebase-login/src';

import { SlidesModule } from '@codelab/slides';


@NgModule({
  declarations: [
    IndexComponent,
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FeedbackModule,
    MenuShortcutModule,
    MenuGithubModule,
    SlidesModule,
    CodelabsRoutingModule,
    FirebaseLoginModule,
    OverlayModule
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
export class CodelabsModule {
}
