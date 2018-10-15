import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slides-hex',
  templateUrl: './hex.component.html',
  styleUrls: ['./hex.component.css']
})
export class HexComponent implements OnInit {
  @Input() data;

  constructor() {
  }

  ngOnInit() {
  }

}
