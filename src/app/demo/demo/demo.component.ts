import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}
  activeSlideId = 0;

  ngOnInit() {
    let id = Number(this.route.snapshot.params['id']);
    if(id){
      this.activeSlideId = id;
    }
  }

}
