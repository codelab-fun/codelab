import {Component, OnInit} from '@angular/core';
import {ng2tsConfig} from '../../../../ng2ts/ng2ts';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  exercises = [
    ng2tsConfig.milestones[0].exercises[1]
  ];

  constructor() {}

  ngOnInit() {
  }

}
