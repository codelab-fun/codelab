import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { PresentationModule } from '@angular-presentation/presentation';
import { NewProgressBarModule } from '../../../angular-presentation/src/app/codelabs/extra/ast/progress-bar/new-progress-bar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    PresentationModule,
    BrowserModule,
    NxModule.forRoot(),
    NewProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
