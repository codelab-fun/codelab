import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegexComponent } from './regex.component';
import { SlidesModule } from 'ng-slides';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from 'ng-slides';

import { LiveModule } from './live';

const routes = RouterModule.forChild(SlidesRoutes.get(RegexComponent));

@NgModule({
  declarations: [RegexComponent],
  imports: [routes, CommonModule, SlidesModule, LiveModule]
})
export class RegexModule {}
