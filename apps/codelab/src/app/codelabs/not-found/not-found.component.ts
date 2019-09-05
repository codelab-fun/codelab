import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'codelab-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {
  public routes = [
    {
      path: '',
      name: 'Home'
    },
    {
      path: '/typescript',
      name: 'Typescript'
    },
    {
      path: '/angular',
      name: 'Angular'
    }
  ];
}
