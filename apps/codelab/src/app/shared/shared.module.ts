import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SlidesModule } from '@codelab/slides';
import { CodeDemoModule } from '@codelab/code-demos';
import { CodelabComponentsModule } from '../components/codelab-components.module';
import { ButtonsNavBarModule } from '../components/buttons-nav-bar/buttons-nav-bar.module';
import { SyncModule } from '../sync/sync.module';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    RouterModule,
    CodeDemoModule,
    CodelabComponentsModule,
    SlidesModule,
    ButtonsNavBarModule,
    SyncModule
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    CodeDemoModule,
    CodelabComponentsModule,
    SlidesModule,
    ButtonsNavBarModule
  ]
})
export class SharedModule {}
