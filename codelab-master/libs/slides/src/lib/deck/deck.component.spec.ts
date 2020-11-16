import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SlidesModule } from '../slides.module';
import { SlidesDeckComponent } from '../deck/deck.component';

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
