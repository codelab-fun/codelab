import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { CssGameComponent } from './css-game.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatExpansionModule, MatInputModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { ExerciseComponent } from './exercise/exercise.component';

const routes = RouterModule.forChild([
    {
      path: 'new',
      component: CssGameComponent
    },
    ...SlidesRoutes.get(CssGameComponent)
  ]
);


@NgModule({
  declarations: [CssGameComponent, ExerciseComponent],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    CommonModule,
    SlidesModule,
    FormsModule,
    routes
  ]
})
export class CssGameModule { }
