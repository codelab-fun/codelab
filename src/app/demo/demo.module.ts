import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {DemoComponent} from './demo/demo.component';
import {SharedModule} from '../shared.module';
import {CodeHighlighterModule} from "../code-highlighter/code-highlighter.module";
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {MonacoConfigService} from '../exercise/services/monaco-config.service';
import {ExerciseModule} from '../exercise/exersice.module';
import {SlidesRoutes} from '../presentation/slide-routes';


export const routes = SlidesRoutes.get(DemoComponent);
export function monacoReady() {
  return MonacoConfigService.monacoReady
}

@NgModule({
  declarations: [
    DemoComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    CodeHighlighterModule,
    ExerciseModule
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useValue: monacoReady,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class DemoModule {
}
