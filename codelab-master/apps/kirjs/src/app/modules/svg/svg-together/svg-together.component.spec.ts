import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgTogetherComponent } from './svg-together.component';

describe('SvgTogetherComponent', () => {
  let component: SvgTogetherComponent;
  let fixture: ComponentFixture<SvgTogetherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SvgTogetherComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgTogetherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
