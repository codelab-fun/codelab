import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {DemoComponent} from './demo/demo.component';
import {SharedModule} from '../shared.module';
import {CodeHighlighterModule} from "../code-highlighter/code-highlighter.module";
import {ExerciseModule} from '../exercise/exersice.module';
import {MonacoConfigService} from '../exercise/services/monaco-config.service';
export function monacoReady() {
  return MonacoConfigService.monacoReady
};

@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    CodeHighlighterModule,
    ExerciseModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useValue: monacoReady,
    multi: true
  }],
  bootstrap: [DemoComponent]
})
export class DemoModule {

}
