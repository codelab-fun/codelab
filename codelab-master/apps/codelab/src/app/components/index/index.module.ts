import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SlidesModule } from '@ng360/slides';
import { IndexComponent } from './index.component';
import { ButtonsNavBarModule } from '../buttons-nav-bar/buttons-nav-bar.module';
import { CodelabComponentsModule } from '../codelab-components.module';
import { SyncModule } from '../../sync/sync.module';
import { AngularRoutesModule } from '../angular-routes/angular-routes.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ButtonsNavBarModule,
    CodelabComponentsModule,
    SlidesModule,
    MatCardModule,
    SyncModule,
    AngularRoutesModule
  ],
  declarations: [IndexComponent],
  exports: [IndexComponent]
})
export class IndexModule {}
