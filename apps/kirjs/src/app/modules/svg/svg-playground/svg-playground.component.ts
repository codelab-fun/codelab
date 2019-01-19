import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slides-svg-playground',
  templateUrl: './svg-playground.component.html',
  styleUrls: ['./svg-playground.component.css']
})
export class SvgPlaygroundComponent implements OnInit {
  @Input() code: string;

  constructor() {}

  ngOnInit() {}
}
