import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { DemoComponent } from './demo/demo.component';
import {SharedModule} from '../shared.module';
import {RouterModule} from '@angular/router';
import {getSlidesRoutes} from '../routes';
import { AppComponent } from './app.component';

const routes = getSlidesRoutes(DemoComponent);

@NgModule({
  declarations: [
    DemoComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class DemoModule {
}
