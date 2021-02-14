import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SvgPlaygroundComponent } from './svg-playground.component';

describe('RaceComponent', () => {
  let component: SvgPlaygroundComponent;
  let fixture: ComponentFixture<SvgPlaygroundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SvgPlaygroundComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
