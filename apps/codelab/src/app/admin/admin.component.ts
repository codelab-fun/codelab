import { Component } from '@angular/core';

@Component({
  selector: 'codelab-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  readonly links = [
    { link: 'users', name: 'Users' },
    { link: 'feedback', name: 'Feedback' }
  ];
}
