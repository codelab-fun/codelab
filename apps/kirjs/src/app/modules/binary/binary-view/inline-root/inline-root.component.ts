import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kirjs-inline-root',
  templateUrl: './inline-root.component.html',
  styleUrls: ['./inline-root.component.css']
})
export class InlineRootComponent implements OnInit {
  @Input() data: any;

  displayData: any;

  constructor() {}

  ngOnInit() {}

  display(displayData: any) {
    this.displayData = displayData;
  }
}
