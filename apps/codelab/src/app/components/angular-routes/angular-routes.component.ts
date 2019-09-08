import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MENU_ROUTES } from '../../codelabs/angular/common';

@Component({
  selector: 'codelab-angular-routes',
  templateUrl: 'angular-routes.component.html',
  styleUrls: ['angular-routes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AngularRoutesComponent {
  constructor(
    @Inject(MENU_ROUTES) readonly menuRoutes
  ) {
  }
}
