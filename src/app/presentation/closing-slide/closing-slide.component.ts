import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slides-closing-slide',
  templateUrl: './closing-slide.component.html',
  styleUrls: ['./closing-slide.component.css']
})
export class ClosingSlideComponent implements OnInit {

  @Input() header: String;
  @Input() body: String;
  @Input() footer: String;

  constructor( ) {

  }

  ngOnInit() {
  }

}
