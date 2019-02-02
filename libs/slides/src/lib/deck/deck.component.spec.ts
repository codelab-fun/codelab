import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SlidesDeckComponent } from './deck.component';

describe('Deck', () => {
  let component: SlidesDeckComponent;
  let fixture: ComponentFixture<SlidesDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlidesDeckComponent],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            queryParams: {
              milestone: 'Hi World'
            }
          }
        }
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test.only('should create', () => {
    expect(component).toBeTruthy();
  });
});
