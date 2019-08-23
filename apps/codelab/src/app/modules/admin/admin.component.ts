import { Component, OnInit } from '@angular/core';
import { AccessService } from './services/access.service';

@Component({
  selector: 'codelab-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  readonly links = [
    {
      link: 'users',
      name: 'Users'
    },
    {
      link: 'feedback',
      name: 'Feedback'
    }
  ];

  constructor(private readonly accessService: AccessService) {
  }

  ngOnInit() {
  }

}
