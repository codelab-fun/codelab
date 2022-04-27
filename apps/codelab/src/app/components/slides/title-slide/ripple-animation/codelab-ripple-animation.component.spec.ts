import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CodelabRippleAnimationComponent } from './codelab-ripple-animation.component';

describe('CodelabRippleAnimationComponent', () => {
  let component: CodelabRippleAnimationComponent;
  let fixture: ComponentFixture<CodelabRippleAnimationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CodelabRippleAnimationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelabRippleAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
