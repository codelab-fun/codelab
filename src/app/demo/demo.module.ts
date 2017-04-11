import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {DemoComponent} from './demo/demo.component';
import {SharedModule} from '../shared.module';
import {RouterModule} from '@angular/router';
import {AppRoutes} from './routes';
import {AppComponent} from './app.component';

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
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class DemoModule {

}
