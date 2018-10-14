import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';

const routes = [
  // {
  //   path: 'ii',
  //   loadChildren: './modules/ii/ii.module#IiModule',
  //   name: 'Image inclusion',
  //   description: 'Image inclusion',
  // },
  {
    path: '',
    loadChildren: './modules/home/home.module#HomeModule',
    name: 'Home',
    description: 'Home',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
