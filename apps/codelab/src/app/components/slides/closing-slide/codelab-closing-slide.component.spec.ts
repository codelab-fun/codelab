import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CodelabClosingSlideComponent } from './codelab-closing-slide.component';
import { Router } from '@angular/router';
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

    setPrevious(link) {
      this.previousLink = link;
    },

    setNext(link) {
      this.nextLink = link;
    }
  };

  const menuRoutes: MenuRoutes = [
    {
      path: 'previouslesson'
    },
    {
      path: 'currentlesson'
    },
    {
      path: 'nextlesson'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: SlidesDeckComponent, useFactory: ()=>{ return slidesDeckComponentStub; } },
        { provide: MENU_ROUTES, useValue: menuRoutes }
      ],
      declarations: [CodelabClosingSlideComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    spyOn(slidesDeckComponentStub, 'setNext');
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
