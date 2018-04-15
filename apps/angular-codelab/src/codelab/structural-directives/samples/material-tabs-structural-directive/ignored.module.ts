import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { HideMeDirective } from './hideme.directive.solved';


// This is needed because angular cli wants the directive to be in a module
// https://github.com/angular/angular/issues/13590
@NgModule({
  declarations: [HideMeDirective]
})
export class IgnoredModule {

}
