import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';
import { BinaryComponent } from './binary.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes = RouterModule.forChild(
  SlidesRoutes.get(BinaryComponent)
);

@NgModule({
  imports: [
    routes,
    FormsModule,
    CommonModule,
  ],
  declarations: [
    BinaryComponent,
  ],
  exports: [BinaryComponent]
})
export class BinaryModule {

}
