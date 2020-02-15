import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { SlidesModule } from '@codelab/slides';
import { IndexComponent } from './index.component';
import { ButtonsNavBarModule } from '../buttons-nav-bar/buttons-nav-bar.module';
import { CodelabComponentsModule } from '../codelab-components.module';
import { SyncModule } from '../../sync/sync.module';
import { AngularRoutesModule } from '../angular-routes/angular-routes.module';

const MATERIAL_MODULES = [MatExpansionModule, MatButtonModule];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ButtonsNavBarModule,
    CodelabComponentsModule,
    SlidesModule,
    MatCardModule,
    SyncModule,
    AngularRoutesModule,
    MATERIAL_MODULES
  ],
  declarations: [IndexComponent]
})
export class IndexModule {}
