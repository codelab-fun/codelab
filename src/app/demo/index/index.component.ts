import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'slides-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  routes: { name: string, description: string };


  constructor(@Inject('ROUTES') routes) {
    this.routes = routes.filter(route => route.name);
  }

  ngOnInit() {
  }

}
