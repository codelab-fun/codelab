import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RadixComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { PresentationModule } from '@angular-presentation/presentation';
import { NewProgressBarModule } from '../../../kirjs/src/app/modules/ast/new-progress-bar/new-progress-bar.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: RadixComponent,

  }
];

@NgModule({
  declarations: [RadixComponent],
  imports: [
    PresentationModule,
    BrowserModule,
    NxModule.forRoot(),
    NewProgressBarModule,
  ],
  providers: [],
  bootstrap: [RadixComponent]
})
export class AppModule {
}
