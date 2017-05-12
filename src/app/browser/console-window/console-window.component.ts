import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slides-console-window',
  templateUrl: './console-window.component.html',
  styleUrls: ['./console-window.component.css']
})
export class ConsoleWindowComponent implements OnInit {
  @Input() width = '496px';
  @Input() height = '';
  constructor() { }

  ngOnInit() {
  }

}
