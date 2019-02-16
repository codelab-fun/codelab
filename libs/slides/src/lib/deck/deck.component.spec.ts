import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('Deck', () => {
  let component: PresentationComponentV2;
  let fixture: ComponentFixture<PresentationComponentV2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PresentationComponentV2]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationComponentV2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
