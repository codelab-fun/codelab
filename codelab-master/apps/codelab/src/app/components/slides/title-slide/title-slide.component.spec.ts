import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TitleSlideComponent } from './title-slide.component';
import { CodelabRippleAnimationComponent } from './ripple-animation/codelab-ripple-animation.component';

describe('TitleSlideComponent', () => {
  let component: TitleSlideComponent;
  let fixture: ComponentFixture<TitleSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CodelabRippleAnimationComponent, TitleSlideComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a title', () => {
    component.title = 'awesome title';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.header'));
    expect(el.nativeElement.textContent).toContain('awesome title');
  });

  it('should render a description', () => {
    component.description = 'hello world!';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.description'));
    expect(el.nativeElement.textContent).toContain('hello world!');
  });

  it('should render prerequisites', () => {
    component.prereqs = 'do this first';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.prereqs'));
    expect(el.nativeElement.textContent).toContain('do this first');
    expect(el.nativeElement.textContent).toContain('Prerequisites');
  });

  it('should not show "Prerequisites" if undefined', () => {
    component.prereqs = undefined;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.prereqs'));
    expect(el.nativeElement.textContent).not.toContain('Prerequisites');
  });
});
