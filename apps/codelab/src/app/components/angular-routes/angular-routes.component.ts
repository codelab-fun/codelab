import { Component, ChangeDetectionStrategy } from '@angular/core';
import { menuRoutes } from '../../codelabs/angular/angular-routing.module';

@Component({
  selector: 'codelab-angular-routes',
  templateUrl: 'angular-routes.component.html',
  styleUrls: ['angular-routes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AngularRoutesComponent {
  public menuRoutes = menuRoutes;
}
