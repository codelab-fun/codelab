import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slides-choice-presenter',
  templateUrl: './choice-presenter.component.html',
  styleUrls: ['./choice-presenter.component.css']
})
export class ChoicePresenterComponent implements OnInit {
  @Input() votes: { [key: string]: number };

  constructor() {
  }

  ngOnInit() {
  }

}
