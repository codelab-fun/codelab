import {NgModule} from '@angular/core';
import {BootstrapComponent} from './bootstrap.component';
import {RouterModule} from '@angular/router';
import {SlidesRoutes} from '../../presentation/slide-routes';
import {PresentationModule} from '../../presentation.module';


const routes = RouterModule.forChild(
  SlidesRoutes.get(BootstrapComponent)
);

@NgModule({
  imports: [routes, PresentationModule],
  declarations: [BootstrapComponent],
  exports: [BootstrapComponent]
})
export class BootstrapModule {

}
