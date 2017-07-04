import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AlertComponent } from './alert.component';
import { TabComponent } from './tab.component';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { MdTabsModule } from '@angular/material';


const routes = [
  {path: '', component: TabComponent},
  {path: 'danger', component: AlertComponent},
];

@NgModule({
  imports: [BrowserModule, MdTabsModule, RouterModule.forRoot(routes)],
  declarations: [AppComponent, AlertComponent, TabComponent],
  bootstrap: [AppComponent],
  providers: [{provide: APP_BASE_HREF, useValue : '/assets/runner/' }]
})
export class AppModule {
}
