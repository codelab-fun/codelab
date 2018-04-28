import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { SvgModule } from '../svg.module';
import { SvgComponent } from '../svg.component';
import { SlidesRoutes } from '@slides/slides/src/slide-routes';


const routes = RouterModule.forRoot(
  SlidesRoutes.get(SvgComponent)
);

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    routes,
    SvgModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
