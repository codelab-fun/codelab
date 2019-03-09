import { Component, OnInit } from '@angular/core';

declare const require;
const data = require('./data.json');

@Component({
  selector: 'codelab-thirty-seconds',
  templateUrl: './angular-thirty-seconds.component.html',
  styleUrls: ['./angular-thirty-seconds.component.css']
})
export class AngularThirtySecondsComponent implements OnInit {
  data = data;

  constructor() {
  }

  ngOnInit() {
  }

}
