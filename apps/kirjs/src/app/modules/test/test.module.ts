import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';

const routes = RouterModule.forChild(SlidesRoutes.get(TestComponent));

@NgModule({
  imports: [CommonModule, routes],
  declarations: [TestComponent],
  entryComponents: [TestComponent]
})
export class TestModule {}
