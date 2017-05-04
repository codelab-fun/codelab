import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './slides-index.component.html',
  styleUrls: ['./slides-index.component.css']
})
export class SlidesIndexComponent implements OnInit {
  routes: { name: string, description: string };


  constructor(@Inject('ROUTES') routes) {
    this.routes = routes.filter(route => route.name);
  }

  ngOnInit() {
  }

}
