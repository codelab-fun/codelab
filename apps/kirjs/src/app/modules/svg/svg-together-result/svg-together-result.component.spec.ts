import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgTogetherResultComponent } from './svg-together-result.component';

describe('SvgTogetherResultComponent', () => {
  let component: SvgTogetherResultComponent;
  let fixture: ComponentFixture<SvgTogetherResultComponent>;

  beforeEach(async(() => {
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
