import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { PuppyComponent } from './components/puppy';
import { KittenComponent } from './components/kitten';
import { BrowserModule } from '@angular/platform-browser';


const routes: Routes = [
  {path: '', component: PuppyComponent},
  {path: 'kittens', component: KittenComponent},
];

const config = RouterModule.forRoot(routes);

@NgModule({
  declarations: [AppComponent, PuppyComponent, KittenComponent],
  imports: [config, BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}

