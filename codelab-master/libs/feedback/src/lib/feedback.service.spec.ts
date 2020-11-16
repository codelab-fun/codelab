import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { async, inject, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { FeedbackService } from './feedback.service';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  template: `
    <router-outlet></router-outlet>
  `
})
class RoutingComponent {}

@Component({
  template: ''
})
class DummyComponent {}

const mockActivatedRoute = {
  url: new BehaviorSubject<string>('')
};

const mockMessages = [
  {
    name: 'a',
    href: '/typescript/1',
    comment: 'blah',
    email: 'dan@dan.com'
  },
  {
    name: 'b',
    href: '/typescript/1',
    comment: 'blah',
    email: 'dan@dan.com'
  },
  {
    name: 'c',
    href: '/typescript/2',
    comment: 'blah',
    email: 'dan@dan.com'
  }
];

let mockMessageStream: any = new BehaviorSubject(mockMessages);
mockMessageStream = Object.assign(mockMessageStream, {
  push: jasmine.createSpy('push')
});

const mockDb = {
  list: jasmine.createSpy('list').and.returnValue(mockMessageStream)
};

let fixture;

xdescribe('FeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FeedbackService,
        {
          provide: AngularFireDatabase,
          useValue: mockDb
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'typescript/1', component: DummyComponent },
          { path: 'typescript/2', component: DummyComponent }
        ])
      ],
      declarations: [RoutingComponent, DummyComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingComponent);
    fixture.detectChanges();
  });

  it('should initialize data source when created', inject(
    [FeedbackService],
    (service: FeedbackService) => {
      expect(mockDb.list).toHaveBeenCalledWith('/feedback');
    }
  ));

  it('should list messages filtered by the router url', async(
    inject(
      [FeedbackService, ActivatedRoute, Router],
      (
        service: FeedbackService,
        _activatedRoute: ActivatedRoute,
        router: Router
      ) => {
        router.navigateByUrl('typescript/1').then(() => {
          const stream = service
            .getMessages(_activatedRoute)
            .subscribe(values => {
              expect(values.length).toEqual(2);
            });
        });
      }
    )
  ));

  it('should list messages filtered by the router url when the activated route changes', async(
    inject(
      [FeedbackService, ActivatedRoute, Router],
      (
        service: FeedbackService,
        _activatedRoute: ActivatedRoute,
        router: any
      ) => {
        let calls = 0;
        router.navigateByUrl('typescript/1').then(() => {
          service.getMessages(_activatedRoute).subscribe(values => {
            if (calls === 0) {
              expect(values.length).toEqual(2);
            }
            if (calls === 1) {
              expect(values.length).toEqual(1);
            }
            calls++;
          });
          router.navigateByUrl('typescript/2').then(() => {
            mockActivatedRoute.url.next('');
          });
        });
      }
    )
  ));

  it('should add a message from the current url', async(
    inject(
      [FeedbackService, Router],
      (service: FeedbackService, router: Router) => {
        router.navigateByUrl('typescript/1').then(() => {
          service.addMessage('a', 'b', 'c', 'header');
          expect(mockMessageStream.push).toHaveBeenCalled();
          const call: jasmine.Spy = mockMessageStream.push;
          const obj = call.calls.mostRecent().args[0];
          expect(obj.href).toEqual('/typescript/1');
        });
      }
    )
  ));
});
