import { Component, Injectable, Input, OnInit } from '@angular/core';
import { LiveService } from '../live.service';

@Component({
  selector: 'kirjs-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent {
  @Input() question: string;
  constructor(readonly service: LiveService) {}
}

@Component({
  selector: 'kirjs-poll-answer',
  template: `
    <li (click)="service.storeMyData(value)"><ng-content></ng-content></li>
  `,
  styleUrls: ['./poll.component.css']
})
export class SlidesAnswerComponent implements OnInit {
  @Input() value: string;
  constructor(readonly service: LiveService) {}

  ngOnInit() {}
}
