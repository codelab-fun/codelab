import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FullLayoutComponent } from './full-layout.component';
import { SyncModule } from '../../sync/sync.module';
import { ButtonsNavBarModule } from '../../components/buttons-nav-bar/buttons-nav-bar.module';

@NgModule({
  imports: [RouterModule, SyncModule, ButtonsNavBarModule],
  declarations: [FullLayoutComponent]
})
export class FullLayoutModule {}
