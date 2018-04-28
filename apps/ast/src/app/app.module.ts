import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@slides/slides/src/slide-routes';
import { AstModule } from '../ast.module';
import { AstComponent } from '../ast.component';


const routes = RouterModule.forRoot(
  SlidesRoutes.get(AstComponent)
);

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    routes,
    AstModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
