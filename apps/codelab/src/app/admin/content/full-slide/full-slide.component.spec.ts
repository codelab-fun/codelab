import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullSlideComponent } from './full-slide.component';

describe('FullSlideComponent', () => {
  let component: FullSlideComponent;
  let fixture: ComponentFixture<FullSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FullSlideComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
