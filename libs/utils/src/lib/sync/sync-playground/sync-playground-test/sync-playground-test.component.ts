import { Component } from '@angular/core';
import { SyncPollConfig } from '@codelab/utils/src/lib/sync/components/poll/common/common';

@Component({
  selector: 'codelab-sync-playground-test',
  templateUrl: './sync-playground-test.component.html',
  styleUrls: ['./sync-playground-test.component.css']
})
export class SyncPlaygroundTestComponent {
  readonly polls: SyncPollConfig[] = [
    {
      key: 'favorite',
      type: 'choice',
      question: 'What is your favorite framework?',
      answer: 'Angular',
      options: ['react', 'Angular', 'Vue', 'Other']
    },
    {
      key: 'other',
      type: 'choice',
      question: 'Another question',
      answer: '3',
      options: ['1', '2', '3', '4']
    }
    /* {
       key: 'js',
       type: 'stars',
       question: 'How well do you know JavaScript',
     },
     {
       key: 'angularjs',
       type: 'stars',
       question: 'How well do you know AngularJS (Old version)',
     },
     {
       key: 'angular',
       type: 'stars',
       question: 'How well do you know Angular',
     },
     {
       key: 'fruit',
       type: 'choice',
       question: 'What is your favorite fruit?',
       answer: '🍏',
       options: [
         '🍏', '🍋', '🍓', '🍍'
       ]
     },
     {
       key: 'angular question',
       type: 'choice',
       question: 'What is your favorite framework?',
       options: [
         'react', 'Angular', 'Vue', 'Other',
       ]
     },
     {
       key: 'longer question',
       type: 'choice',
       question: 'Who created angular',
       options: [
         'Мега корпорация "Крошка-Картошка"', 'Facebook сделал лично Цукерберг', 'Николай Васильевич Гогол',
         'Google Angular Brad Green Misko',
       ]
     }*/
  ];
}
