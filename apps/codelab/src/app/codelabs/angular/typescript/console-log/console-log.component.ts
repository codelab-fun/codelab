import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'console-log',
  templateUrl: './console-log.component.html',
  styleUrls: ['./console-log.component.css']
})
export class ConsoleLogComponent implements OnInit, OnDestroy {

  @Input() number: number;

  constructor() { }

  ngOnInit() {
    console.log('Created', this.number);
  }

  ngOnDestroy() {
    console.log('Destroyed', this.number);
  }

}
