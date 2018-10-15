import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'angular-presentation-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

  @Input() param = 0;
  @Input() code = '';

  memory = Array.from({length: 64}).fill({
    value: 0,
    type: 'empty'
  }) as any;

  constructor() {

  }

  alloc5bool(start = 0) {
    for (let x = 0; x < 5; x++) {
      this.memory[x + start] = {
        value: Math.round(Math.random()),
        type: 'boolean'
      }
    }
  }

  alloc5numbers() {
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 8; y++) {
        this.memory[x * 8 + y] = {
          value: Math.round(Math.random()),
          type: y === 7 ? 'cell-number-end' : 'number'
        }
      }
    }
  }

  highlightBoolean(i: number) {
    this.memory[i].type = 'selected';
  }

  highlightNumber(i: number) {
    for (let y = 0; y < 8; y++) {
      this.memory[i * 8 + y] = {
        value: Math.round(Math.random()),
        type: y === 7 ? 'number-end-highlight' : 'number-highlight'
      }
    }
  }

  ngOnInit() {

    if (this.param === 0) {
      return;
    }

    if (this.param === 1) {
      this.alloc5bool();
    }

    if (this.param === 2) {
      this.alloc5bool();
      this.highlightBoolean(3);
    }

    if (this.param === 3) {
      this.alloc5numbers();
    }

    if (this.param === 4) {
      this.alloc5numbers();
      this.highlightNumber(3)
    }
    if (this.param === 5) {
      this.alloc5numbers();
      this.highlightNumber(3);
      this.alloc5bool(40);
      this.highlightBoolean(43);
    }


  }
}
