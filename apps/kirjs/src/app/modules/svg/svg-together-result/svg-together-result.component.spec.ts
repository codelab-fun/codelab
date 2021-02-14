import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SvgTogetherResultComponent } from './svg-together-result.component';

describe('SvgTogetherResultComponent', () => {
  let component: SvgTogetherResultComponent;
  let fixture: ComponentFixture<SvgTogetherResultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SvgTogetherResultComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgTogetherResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
