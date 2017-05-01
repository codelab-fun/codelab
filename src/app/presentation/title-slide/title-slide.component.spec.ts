import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RippleAnimationComponent } from '../ripple-animation/ripple-animation.component';
import { TitleSlideComponent } from './title-slide.component';


describe('TitleSlideComponent', () => {
  let component: TitleSlideComponent;
  let fixture: ComponentFixture<TitleSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RippleAnimationComponent, TitleSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
