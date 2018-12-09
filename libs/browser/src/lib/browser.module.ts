import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserWindowComponent } from './browser-window/browser-window.component';
import { ConsoleWindowComponent } from './console-window/console-window.component';
import { TerminalWindowComponent } from './terminal-window/terminal-window.component';
import { PreviewWindowComponent } from './preview-window/preview-window.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BrowserWindowComponent, ConsoleWindowComponent, TerminalWindowComponent, PreviewWindowComponent],
  exports: [BrowserWindowComponent, ConsoleWindowComponent, TerminalWindowComponent, PreviewWindowComponent]
})
export class BrowserWindowModule {
}
