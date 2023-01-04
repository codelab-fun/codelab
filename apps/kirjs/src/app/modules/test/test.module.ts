import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@codelab/slides';
import { TestComponent } from './test.component';

const routes = RouterModule.forChild(SlidesRoutes.get(TestComponent));

@NgModule({
  imports: [CommonModule, routes],
  declarations: [TestComponent],
})
export class TestModule {}
