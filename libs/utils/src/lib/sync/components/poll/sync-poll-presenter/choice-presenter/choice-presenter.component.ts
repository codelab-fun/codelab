import { Component, Input, OnInit } from '@angular/core';
import { LETTERS } from '@codelab/utils/src/lib/sync/components/poll/common/common';

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
    console.log(votes);
    this.breakdown = Object.values(votes || {}).reduce((result, value) => {
      result[LETTERS[value]] = (result[LETTERS[value]] || 0) + 1;
      return result;
    }, {});
    console.log(this.breakdown);
  }

  ngOnInit() {
  }

}
