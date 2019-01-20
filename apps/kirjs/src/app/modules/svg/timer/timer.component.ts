import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirjs-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  time = 0;

  reset() {
    this.time = 180;
  }

  constructor() {
    window.setInterval(() => {
      if (this.time > 0) {
        this.time--;
      }
    }, 1000);
  }

  ngOnInit() {}
}
