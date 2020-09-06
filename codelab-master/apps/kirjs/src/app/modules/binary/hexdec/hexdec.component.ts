import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirjs-hexdec',
  templateUrl: './hexdec.component.html',
  styleUrls: ['./hexdec.component.css']
})
export class HexdecComponent implements OnInit {
  numbers = new Array(16).fill(0).map((a, i) => ({
    bin: i.toString(2).padStart(4, '0'),
    hex: i.toString(16)
  }));

  constructor() {}

  ngOnInit() {}
}
