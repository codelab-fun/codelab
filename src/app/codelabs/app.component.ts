import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'slides-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  constructor() {
    const x =  'hello AngularNYC!';
    const a = x + 'hey';
  }

  ngAfterViewInit(){
    console.log('hi');
  }
  ngOnInit() {
  }
}



