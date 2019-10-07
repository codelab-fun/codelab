import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { SlidesModule } from '@codelab/slides';

describe('Deck', () => {
  let component: SlidesDeckComponent;
  let fixture: ComponentFixture<SlidesDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SlidesModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
