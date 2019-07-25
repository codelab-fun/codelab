import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgPlaygroundComponent } from './svg-playground.component';

describe('RaceComponent', () => {
  let component: SvgPlaygroundComponent;
  let fixture: ComponentFixture<SvgPlaygroundComponent>;

  beforeEach(async(() => {
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
