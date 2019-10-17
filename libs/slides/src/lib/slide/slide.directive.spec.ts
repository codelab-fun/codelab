import { SlideDirective } from './slide.directive';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SlidesModule } from '@codelab/slides';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';

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
