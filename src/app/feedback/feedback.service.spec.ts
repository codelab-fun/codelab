import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FeedbackService } from './feedback.service';
import { inject, TestBed } from '@angular/core/testing';

const router = {
  url: 'abc123'
};

const activatedRoute = {
  url: new BehaviorSubject<string>('')
};

const messages = [
  {
    name: 'a',
    href: 'def456',
    comment: 'blah',
    email: 'dan@dan.com'
  },
  {
    name: 'b',
    href: 'abc123',
    comment: 'blah',
    email: 'dan@dan.com'
  },
  {
    name: 'c',
    href: 'abc123',
    comment: 'blah',
    email: 'dan@dan.com'
  }
];

let messageStream: any = new BehaviorSubject(messages);
messageStream = Object.assign(messageStream, { push: jasmine.createSpy('push') });

const fire = {
  list: jasmine.createSpy('list').and.returnValue(messageStream)
};

fdescribe('FeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FeedbackService,
        {
          provide: AngularFireDatabase,
          useValue: fire
        },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    });
  });

  it('should exist', inject([FeedbackService], (service: FeedbackService) => {
    expect(service).toBeTruthy();
  }));

  it('should initialize data source when created', inject([FeedbackService], (service: FeedbackService) => {
    expect(fire.list).toHaveBeenCalled();
  }));

  it('should list messages filtered by the router url', inject([FeedbackService, ActivatedRoute, Router],
    (service: FeedbackService, _activatedRoute: ActivatedRoute, _router: any) => {
      const stream = service.getMessages(_activatedRoute);
      stream.subscribe(values => {
        expect(values.length).toEqual(2);
      });
    }));

  it('should list messages filtered by the router url when the activated route changes', inject([FeedbackService, ActivatedRoute, Router],
    (service: FeedbackService, _activatedRoute: ActivatedRoute, _router: any) => {
      const stream = service.getMessages(_activatedRoute);
      let first = false;
      stream.subscribe(values => {
        if (!first) {
          expect(values.length).toEqual(2);
          first = true;
        } else {
          expect(values.length).toEqual(1);
        }
      });
      _router.url = 'def456';
      activatedRoute.url.next('');
    }));

  it('should add a message from the current url', inject([FeedbackService, Router], (service: FeedbackService, _router: any) => {
    service.addMessage('a', 'b', 'c', 'header');
    expect(messageStream.push).toHaveBeenCalled();
    const call: jasmine.Spy = messageStream.push;
    const obj = call.calls.mostRecent().args[0];
    expect(obj.href).toEqual('abc123');
  }));

});
