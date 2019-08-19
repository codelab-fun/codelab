import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slides-choice-presenter',
  templateUrl: './choice-presenter.component.html',
  styleUrls: ['./choice-presenter.component.css']
})
export class ChoicePresenterComponent implements OnInit {
  private breakdown: { [key: string]: number };


  constructor() {
  }

  @Input() set votes(votes: { [key: string]: number }) {
    this.breakdown = Object.values(votes || {}).reduce((result, value) => {
      result[value] = (result[value] || 0) + 1;
      return result;
    }, {});
  }

  ngOnInit() {
  }

}
