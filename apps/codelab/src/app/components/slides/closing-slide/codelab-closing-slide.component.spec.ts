import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CodelabClosingSlideComponent } from './codelab-closing-slide.component';
import { ActivatedRoute } from '@angular/router';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { MenuRoutes } from '../../../common';
import { MenuRouteService } from '../../../codelabs/angular/menu-route.service';

describe('CodelabClosingSlideComponent', () => {
  let component: CodelabClosingSlideComponent;
  let fixture: ComponentFixture<CodelabClosingSlideComponent>;

  const menuRouteService = {
    getNextLink: function() {
      return 'nextlesson';
    }
  };

  const slidesDeckComponentStub = {
    setNext: jasmine.createSpy('setNext')
  };

  const menuRoutes: MenuRoutes = [
    {
      path: 'previouslesson',
      prod: true
    },
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
    snapshot: { pathFromRoot: [{ routeConfig: menuRoutes[1] }] }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: MenuRouteService, useValue: menuRouteService },
        { provide: SlidesDeckComponent, useValue: slidesDeckComponentStub }
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
});
