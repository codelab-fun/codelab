import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'codelab-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {
  code: Record<string, string> = {
    'index.html': 'Lol',
    'bootstrap.ts': `
import { Injector } from '@angular/core';

console.log(11230);
     `
  };
  polls = [
    {
      key: 'favorite',
      type: 'choice',
      question: 'Which framework do you use most at work?',
      options: [
        'Angular',
        'AngularJS',
        'React',
        'Vue',
        'Svelte',
        'jQuery',
        'Something else'
      ]
    },
    {
      key: 'skill',
      type: 'choice',
      question: 'How well do you know angular?',
      options: [
        'Not at all',
        'Somewhat',
        'I can use it',
        'Good',
        'Really good',
        "I'm Minko Fluin"
      ]
    },
    {
      key: 'build-dev',
      type: 'choice',
      question:
        'how long does it take to rebuild your app in dev mode (and see the result via local dev server) - the total turnaround time',
      options: [
        '< 1 second',
        '1 - 5 seconds',
        '5 - 10 seconds',
        '10 - 30 seconds',
        '30 - 60 seconds',
        '1-10 minutes',
        'More than 10 minutes'
      ]
    },
    {
      key: 'build-prod',
      type: 'choice',
      question:
        'how long does it take to create a production build of your app',
      options: [
        '< 1 second',
        '1 - 5 seconds',
        '5 - 10 seconds',
        '10 - 30 seconds',
        '30 - 60 seconds',
        '1-10 minutes',
        'More than 10 minutes'
      ]
    },
    {
      key: 'cli',
      type: 'choice',
      question: 'Which feature is NOT in CLI 8.3.0-next.2 ',
      answer: 'New command ng make-this-awesome',
      options: [
        'Redesigned default app',
        'New command ng make-this-awesome',
        'Faster builds with enabled differential loading',
        'New command ng deploy'
      ]
    },
    {
      key: 'tomorrow',
      type: 'choice',
      question: 'What is being released today?',
      answer: 'CLI 9.0.0-next.0 with Ivy by default',
      options: [
        'CLI 9.0.0-next.0 with Ivy by default',
        'RxJS 8',
        'React 16.12',
        'Angular XS'
      ]
    },
    {
      key: 'material',
      type: 'choice',
      question:
        'Which feature was added to Angular CDK library 8.1.3 "gelatin-key" (2019-08-14)?',
      answer: '',
      options: [
        'Windows 95 theme support',
        'Drag and drop',
        'New material-fox component',
        'New Clipboard service + directive'
      ]
    }
  ];

  constructor() {}

  ngOnInit() {}
}
