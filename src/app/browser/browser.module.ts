import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserWindowComponent } from './browser-window/browser-window.component';
import { ConsoleWindowComponent } from './console-window/console-window.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BrowserWindowComponent, ConsoleWindowComponent],
  exports: [BrowserWindowComponent, ConsoleWindowComponent]
})
export class BrowserWindowModule {
}
