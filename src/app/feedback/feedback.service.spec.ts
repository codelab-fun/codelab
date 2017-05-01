import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FeedbackService } from './feedback.service';
import { inject, TestBed } from '@angular/core/testing';

const mockRouter = {
  url: 'abc123'
};

const mockActivatedRoute = {
  url: new BehaviorSubject<string>('')
};

const mockMessages = [
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

let mockMessageStream: any = new BehaviorSubject(mockMessages);
mockMessageStream = Object.assign(mockMessageStream, { push: jasmine.createSpy('push') });

const mockDb = {
  list: jasmine.createSpy('list').and.returnValue(mockMessageStream)
};

describe('FeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FeedbackService,
        {
          provide: AngularFireDatabase,
          useValue: mockDb
        },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });
  });

  it('should initialize data source when created', inject([FeedbackService], (service: FeedbackService) => {
    expect(mockDb.list).toHaveBeenCalledWith('/feedback');
  }));

  it('should list messages filtered by the router url', inject([FeedbackService, ActivatedRoute],
    (service: FeedbackService, _activatedRoute: ActivatedRoute) => {
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
      mockActivatedRoute.url.next('');
    }));

  it('should add a message from the current url', inject([FeedbackService], (service: FeedbackService) => {
    service.addMessage('a', 'b', 'c', 'header');
    expect(mockMessageStream.push).toHaveBeenCalled();
    const call: jasmine.Spy = mockMessageStream.push;
    const obj = call.calls.mostRecent().args[0];
    expect(obj.href).toEqual('abc123');
  }));

});
