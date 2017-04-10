import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  activeSlideId = 0;

  ngOnInit() {
    if(this.route.snapshot.params['id']){
      this.activeSlideId = Number(this.route.snapshot.params['id']);
    }
  }

}
