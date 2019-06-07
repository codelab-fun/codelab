import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'kirjs-bit',
  templateUrl: './bit.component.html',
  styleUrls: ['./bit.component.css']
})
export class BitComponent implements OnInit, OnDestroy {
  bits = 7;
  @Input() param = 1;

  bitValue: number[] = [];

  private interval = setInterval(() => {
    this.generate();
  }, 500);

  generate() {
    this.bitValue = Array.from({ length: this.param }).map(a =>
      Math.round(Math.random())
    );
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  ngOnInit() {
    this.generate();
  }
}
