import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingSlideComponent } from './closing-slide.component';

describe('ClosingSlideComponent', () => {
  let component: ClosingSlideComponent;
  let fixture: ComponentFixture<ClosingSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosingSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosingSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
