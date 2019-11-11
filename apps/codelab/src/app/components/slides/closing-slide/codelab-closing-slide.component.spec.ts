import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CodelabClosingSlideComponent } from './codelab-closing-slide.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { MENU_ROUTES, MenuRoutes } from '../../../common';

describe('CodelabClosingSlideComponent', () => {
  let component: CodelabClosingSlideComponent;
  let fixture: ComponentFixture<CodelabClosingSlideComponent>;
  const routerStub = {
    url: '/ngtest/currentlesson'
  };

  const slidesDeckComponentStub = {
    previousLink: '',
    nextLink: '',
    setNext: jasmine.createSpy('setNext')
  };

  const menuRoutes: MenuRoutes = [
    {
      path: 'currentlesson',
      prod: true
    },
    {
      path: 'nextlesson',
      prod: true
    }
  ];

  const activatedRouteStub = {
    snapshot: {
      pathFromRoot: [
        {
          routeConfig: menuRoutes[0]
        }
      ]
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub },
        { provide: SlidesDeckComponent, useValue: slidesDeckComponentStub },
        { provide: MENU_ROUTES, useValue: menuRoutes }
      ],
      declarations: [CodelabClosingSlideComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelabClosingSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setNextLink', () => {
    expect(slidesDeckComponentStub.setNext).toHaveBeenCalled();
  });
});
