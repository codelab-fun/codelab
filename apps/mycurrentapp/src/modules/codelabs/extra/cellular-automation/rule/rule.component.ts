import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slides-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {
  @Input() before = [];
  @Input() after = [];
  @Input() arrow = false;

  constructor() {}

  ngOnInit() {}
}
