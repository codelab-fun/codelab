import { Component, Input, OnInit } from '@angular/core';
import { LETTERS } from '@codelab/utils/src/lib/sync/components/poll/common/common';
import { UserVote } from '@codelab/utils/src/lib/sync/components/poll/common/sync-poll.service';

@Component({
  selector: 'slides-choice-presenter',
  templateUrl: './choice-presenter.component.html',
  styleUrls: ['./choice-presenter.component.css']
})
export class ChoicePresenterComponent implements OnInit {
  @Input() options: string[];
  @Input() answer: string;
  @Input() answerIndex: number;

  breakdown: { [key: string]: number };

  constructor() {
  }

  @Input() set votes(votes: { [key: string]: UserVote }) {
    const startMap = this.options.map((a, i) => LETTERS[i]).reduce((r, k) => {
      r[k] = 0;
      return r;
    }, {});

    this.breakdown = Object.values(votes || {}).reduce((result, response) => {
      const value = response.answer;
      result[LETTERS[value]] = (result[LETTERS[value]] || 0) + 1;
      return result;
    }, startMap);

  }


  ngOnInit() {
  }

}
