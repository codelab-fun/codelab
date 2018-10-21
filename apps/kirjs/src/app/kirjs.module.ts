import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { monacoReady } from '../../../angular-presentation/src/app/codelabs/codelabs.module';

const routes = [
  {
    path: 'binary',
    loadChildren: './modules/binary/binary.module#BinaryModule',
    name: 'Binary',
    description: 'Learn about Binary in JS',
    page: 'bonus',
    prod: true
  },
  {
    path: 'ii',
    loadChildren: './modules/ii/ii.module#IiModule',
    name: 'Image inclusion',
    description: 'Image inclusion',
  },
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
  providers: [
    {
      provide: APP_INITIALIZER,
      useValue: monacoReady,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class KirjsModule {
}
