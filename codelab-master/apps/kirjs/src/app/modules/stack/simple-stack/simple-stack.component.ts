import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slides-simple-stack',
  templateUrl: './simple-stack.component.html',
  styleUrls: ['./simple-stack.component.css']
})
export class SimpleStackComponent implements OnInit {
  @Input() value: string;

  constructor() {}

  ngOnInit() {}
}
