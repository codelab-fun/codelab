import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserWindowComponent } from './browser-window/browser-window.component';
import { TerminalWindowComponent } from './terminal-window/terminal-window.component';
import { PreviewWindowComponent } from './preview-window/preview-window.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    BrowserWindowComponent,
    TerminalWindowComponent,
    PreviewWindowComponent
  ],
  exports: [
    BrowserWindowComponent,
    TerminalWindowComponent,
    PreviewWindowComponent
  ]
})
export class BrowserWindowModule {}
