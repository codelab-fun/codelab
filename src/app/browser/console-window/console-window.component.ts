import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slides-console-window',
  templateUrl: './console-window.component.html',
  styleUrls: ['./console-window.component.css']
})
export class ConsoleWindowComponent implements OnInit {
  @Input() height = '';

  constructor() {
  }

  ngOnInit() {
  }

}
