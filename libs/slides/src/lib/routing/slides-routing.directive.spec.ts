import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { SlidesDeckComponent } from '../deck/deck.component';
import { SlidesRoutingDirective } from './slides-routing.directive';
import { EventEmitter } from '@angular/core';

describe('SlidesRoutingDirective', () => {
  let directive: SlidesRoutingDirective;

  beforeEach(() => {
    const activatedRouteStub = { snapshot: { params: {} } };

    const routerStub = {
      navigate: () => ({}),
      events: { pipe: () => ({ subscribe: () => ({}) }) }
    };

    const slidesDeckComponentStub = {
      slides: [{ id: 1 }, { id: 2 }],
      goToSlide(n: number) {
        this.activeSlideIndex = n;
        this.slideChange.emit(n);
      },
      slideChange: new EventEmitter<number>(),
      activeSlideIndex: 0
    };

    TestBed.configureTestingModule({
      providers: [
        SlidesRoutingDirective,
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub },
        { provide: SlidesDeckComponent, useValue: slidesDeckComponentStub }
      ]
    });
    directive = TestBed.inject(SlidesRoutingDirective);
  });

  it('can load instance', () => {
    expect(directive).toBeTruthy();
  });

  xit('should call navigate on slideChange event', () => {
    const slidesDeckComponentStub: SlidesDeckComponent = TestBed.inject(
      SlidesDeckComponent
    );

    spyOn(directive, 'getId');
    slidesDeckComponentStub.slideChange.emit(10);
    // window.dispatchEvent(new Event('slideChange'));
    expect(directive.getId).toHaveBeenCalledTimes(1);
    expect(directive.getId).toHaveBeenCalledWith(10);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const slidesDeckComponentStub: SlidesDeckComponent = TestBed.inject(
        SlidesDeckComponent
      );
      spyOn(slidesDeckComponentStub, 'goToSlide');
      directive.ngOnInit();
      expect(slidesDeckComponentStub.goToSlide).toHaveBeenCalled();
    });
  });

  describe('getId', () => {
    it('should return the id prop of the slide at the given index', () => {
      const slidesDeckComponentStub: SlidesDeckComponent = TestBed.inject(
        SlidesDeckComponent
      );

      slidesDeckComponentStub.slides = [
        { id: 'typescript' },
        { id: 'javascript' }
      ];

      slidesDeckComponentStub.slides.forEach((slide, index, arr) => {
        const retrievedId = directive.getId(index);
        expect(retrievedId).toBe(slide.id);
      });
    });
  });
});
