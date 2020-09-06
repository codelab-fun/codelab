import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SlidesModule } from '../slides.module';
import { SlidesDeckComponent } from '../deck/deck.component';
import { SlideDirective } from './slide.directive';

describe('SlideDirective', () => {
  let fixture: ComponentFixture<SlidesDeckComponent>;
  let directive: SlidesDeckComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SlidesModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesDeckComponent);
    directive = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
