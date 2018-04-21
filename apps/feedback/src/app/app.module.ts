import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { FeedbackPageModule } from './feedback-page.module';
import { RouterModule } from '@angular/router';
import { FeedbackPageComponent } from './feedback-page.component';
import { SlidesRoutes } from '@slides/slides/src/slide-routes';


const routes = RouterModule.forRoot(
  SlidesRoutes.get(FeedbackPageComponent)
);

@NgModule({
  imports: [routes, BrowserModule, NxModule.forRoot(), FeedbackPageModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
