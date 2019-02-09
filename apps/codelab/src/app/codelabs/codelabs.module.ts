import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';

import { CodelabsRoutingModule } from './codelabs-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedbackModule } from '@codelab/feedback';
import { SlidesModule } from '@codelab/slides';
import { FirebaseLoginModule } from '@codelab/firebase-login/src';

@NgModule({
  declarations: [IndexComponent, AppComponent],
  imports: [
    BrowserAnimationsModule,
    FeedbackModule,
    SlidesModule,
    CodelabsRoutingModule,
    FirebaseLoginModule,
  ],
  bootstrap: [AppComponent]
})
export class CodelabsModule {
}
