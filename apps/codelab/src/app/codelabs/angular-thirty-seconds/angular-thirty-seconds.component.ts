import { Component, OnInit } from '@angular/core';

declare const require;

@Component({
  selector: 'codelab-thirty-seconds',
  templateUrl: './angular-thirty-seconds.component.html',
  styleUrls: ['./angular-thirty-seconds.component.css']
})
export class AngularThirtySecondsComponent implements OnInit {
  data: any;

  constructor() {
    this.fetchData();
  }

  async fetchData() {
    const data = (await fetch('https://gitcdn.link/repo/nycJSorg/30-seconds-of-angular/master/data/data.json'));
    this.data = JSON.parse(await data.text());
  }

  ngOnInit() {
  }
}
