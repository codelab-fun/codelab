import { Component, OnInit } from '@angular/core';
import { LoginService } from '@codelab/firebase-login';
import { Poll } from '@codelab/utils/src/lib/sync/components/poll/sync-poll.component';

@Component({
  selector: 'slides-sync-playground-test',
  templateUrl: './sync-playground-test.component.html',
  styleUrls: ['./sync-playground-test.component.css']
})
export class SyncPlaygroundTestComponent implements OnInit {
  readonly polls: Poll[] = [
    {
      key: 'fruit',
      question: 'What is your favorite fruit?',
      answers: [
        '🍏', '🍋', '🍓', '🍍'
      ]
    },
    {
      key: 'angular question',
      question: 'What is your favorite framework?',
      answers: [
        'react', 'Angular', 'Vue', 'Other',
      ]
    }
  ];

  constructor(readonly loginService: LoginService) { }



  ngOnInit() {
  }

}
