import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'codelab-closing-slide',
  templateUrl: './codelab-closing-slide.component.html',
  styleUrls: ['./codelab-closing-slide.component.css']
})
export class CodelabClosingSlideComponent implements OnInit {
  @Input() header: String;
  @Input() body: String;
  @Input() footer: String;

  constructor() {}

  ngOnInit() {}
}
