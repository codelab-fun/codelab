import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slides-ascii',
  templateUrl: './ascii.component.html',
  styleUrls: ['./ascii.component.css']
})
export class AsciiComponent implements OnInit {
  basics = Array.from(new Array(128)).map((a, i) => ({
    key: i,
    value: String.fromCharCode(i).trim()
  })).slice(33);

  basics_ = Array.from(new Array(128)).map((a, i) => ({
    key: i + 128,
    value: String.fromCharCode(i + 128).trim()
  })).slice(33);


  constructor() {
    //d = new TextDecoder('windows-125').decode(new Uint8Array(255).map((a,i)=>i).buffer)
  }

  ngOnInit() {
  }

}
