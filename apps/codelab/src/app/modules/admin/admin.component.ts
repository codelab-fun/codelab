import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slides-admin',
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

  constructor() {
  }

  ngOnInit() {
  }

}
