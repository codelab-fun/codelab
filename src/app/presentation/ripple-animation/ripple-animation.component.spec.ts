import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RippleAnimationComponent } from './ripple-animation.component';

describe('RippleAnimationComponent', () => {
  let component: RippleAnimationComponent;
  let fixture: ComponentFixture<RippleAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RippleAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RippleAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
