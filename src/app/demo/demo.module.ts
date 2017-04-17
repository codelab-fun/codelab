import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { DemoComponent } from './demo/demo.component';
import {SharedModule} from '../shared.module';
import {CodeHighlighterModule} from "../code-highlighter/code-highlighter.module";

@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    CodeHighlighterModule
  ],
  providers: [],
  bootstrap: [DemoComponent]
})
export class DemoModule {

}
