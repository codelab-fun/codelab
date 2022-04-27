import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SlidesModule } from '../slides.module';
import { SlidesDeckComponent } from '../deck/deck.component';

describe('Deck', () => {
  let component: SlidesDeckComponent;
  let fixture: ComponentFixture<SlidesDeckComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SlidesModule],
      teardown: { destroyAfterEach: false },
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
