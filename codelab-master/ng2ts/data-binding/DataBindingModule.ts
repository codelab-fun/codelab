import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ParentComponent, Rectangle} from './DataBinding';

@NgModule({
  imports: [BrowserModule],
  declarations: [ParentComponent, Rectangle],
  bootstrap: [ParentComponent]
})
export class AppModule {
}
