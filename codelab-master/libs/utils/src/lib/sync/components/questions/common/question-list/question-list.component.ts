import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '@codelab/utils/src/lib/sync/components/questions/common/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'codelab-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  animations: [
    trigger('questionList', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }), // initial
        animate(
          '0.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 })
        ) // final
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate(
          '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)',
            opacity: 0,
            height: '0px',
            margin: '0px'
          })
        )
      ])
    ])
  ]
})
export class QuestionListComponent {
  @Input() questions: Question[];
  @Output() vote = new EventEmitter<{ vote: number; question: Question }>();

  constructor() {}

  trackBy(i, question) {
    console.log(question.key, '$$');
    return question.key;
  }
}
