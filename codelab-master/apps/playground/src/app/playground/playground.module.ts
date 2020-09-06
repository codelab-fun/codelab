import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';
import { RouterModule } from '@angular/router';
import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule } from '@angular/forms';
import { FirebaseModule } from '@codelab/firebase';

@NgModule({
  declarations: [PlaygroundComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: PlaygroundComponent }]),
    CodeDemoModule,
    CommonModule,
    FormsModule,
    FirebaseModule
  ]
})
export class PlaygroundModule {}
