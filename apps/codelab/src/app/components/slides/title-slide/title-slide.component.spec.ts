import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { TitleSlideComponent } from './title-slide.component';
import { CodelabRippleAnimationComponent } from './ripple-animation/codelab-ripple-animation.component';
import { MenuRoutes, MENU_ROUTES } from '../../../common';
import { Router } from '@angular/router';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';

describe('TitleSlideComponent', () => {
  let component: TitleSlideComponent;
  let fixture: ComponentFixture<TitleSlideComponent>;
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
        { provide: SlidesDeckComponent, useFactory: () => { return slidesDeckComponentStub; } },
        { provide: MENU_ROUTES, useValue: menuRoutes }
      ],
      imports: [RouterTestingModule],
      declarations: [CodelabRippleAnimationComponent, TitleSlideComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set previousLink', () => {
    expect(slidesDeckComponentStub.previousLink).not.toBe('');
  });

  it('should set nextLink', () => {
    expect(slidesDeckComponentStub.nextLink).not.toBe('');
  });

  it('should render a title', () => {
    component.title = 'awesome title';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.header'));
    expect(el.nativeElement.textContent).toContain('awesome title');
  });

  it('should render a description', () => {
    component.description = 'hello world!';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.description'));
    expect(el.nativeElement.textContent).toContain('hello world!');
  });

  it('should render prerequisites', () => {
    component.prereqs = 'do this first';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.prereqs'));
    expect(el.nativeElement.textContent).toContain('do this first');
    expect(el.nativeElement.textContent).toContain('Prerequisites');
  });

  it('should not show "Prerequisites" if undefined', () => {
    component.prereqs = undefined;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.prereqs'));
    expect(el.nativeElement.textContent).not.toContain('Prerequisites');
  });
});
