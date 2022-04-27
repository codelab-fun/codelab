import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SlidesModule } from '../slides.module';
import { SlidesDeckComponent } from '../deck/deck.component';
import { SlideDirective } from './slide.directive';

describe('SlideDirective', () => {
  let fixture: ComponentFixture<SlidesDeckComponent>;
  let directive: SlidesDeckComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SlidesModule],
      teardown: { destroyAfterEach: false },
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
