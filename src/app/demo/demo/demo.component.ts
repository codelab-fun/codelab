import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ng2tsConfig} from '../../../../ng2ts/ng2ts';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  exercises = [
    ng2tsConfig.milestones[0].exercises[1],
    ng2tsConfig.milestones[1].exercises[1],
    ng2tsConfig.milestones[1].exercises[2]
  ];

  constructor(private route: ActivatedRoute,
    private router: Router
  ) {}
  activeSlideId = 0;

  ngOnInit() {
    if(this.route.snapshot.params['id']){
      this.activeSlideId = Number(this.route.snapshot.params['id']);
    }
  }
}
