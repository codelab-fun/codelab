import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slides-poll',
  template: `
    <ul>
      <ng-content></ng-content>
    </ul>
  `,
  styleUrls: ['./kirjs-poll.component.css']
})
export class KirjsPollComponent {
}

@Component({
  selector: 'slides-poll-answer',
  template: `
    <li>
      <ng-content></ng-content>
    </li>
  `,
  styleUrls: ['./kirjs-poll.component.css']
})
export class SlidesAnswerComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
