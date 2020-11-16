import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { RegexComponent } from './regex.component';
import { LiveModule } from './live';

const routes = RouterModule.forChild(SlidesRoutes.get(RegexComponent));

@NgModule({
  declarations: [RegexComponent],
  imports: [routes, CommonModule, SlidesModule, LiveModule]
})
export class RegexModule {}
