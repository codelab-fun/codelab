import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kirjs-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() pattern;
  @Input() cellHeight = 50;
  @Input() cellWidth = 50;
  @Input() transform;
  @Input() playing = false;
  @Input() delay = 500;

  constructor() {}

  public play() {
    this.playing = true;
  }

  runTransform() {
    if (this.playing) {
      this.pattern = this.transform(this.pattern);
    }
    setTimeout(() => {
      this.runTransform();
    }, this.delay);
  }

  ngOnInit() {
    if (this.transform) {
      this.runTransform();
    }
  }
}
