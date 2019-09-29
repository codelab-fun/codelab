import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TogglePanelComponent} from './toggle-panel/toggle-panel.component';
import {WrapperComponent} from './wrapper.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [WrapperComponent, TogglePanelComponent],
  bootstrap: [WrapperComponent]
})
export class AppModule {
}
