import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CodelabClosingSlideComponent } from './codelab-closing-slide.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { MENU_ROUTES, MenuRoutes } from '../../../common';
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
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

  it('should call setNextLink', () => {
    expect(slidesDeckComponentStub.setNext).toHaveBeenCalled();
  });
});
