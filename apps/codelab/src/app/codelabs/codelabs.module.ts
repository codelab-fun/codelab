import { APP_INITIALIZER, NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { monacoReady } from '@codelab/code-demos';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { CodelabsRoutingModule } from './codelabs-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlidesModule } from '@codelab/slides';
import { ButtonsNavBarModule } from '../components/buttons-nav-bar/buttons-nav-bar.module';
import { SyncModule } from './sync/sync.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [IndexComponent, AppComponent, NotFoundComponent],
  imports: [
    CodelabsRoutingModule,
    BrowserAnimationsModule,
    SlidesModule,
    OverlayModule,
    ButtonsNavBarModule,
    SyncModule
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
