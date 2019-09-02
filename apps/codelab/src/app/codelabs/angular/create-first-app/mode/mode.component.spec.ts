import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModeComponent } from './mode.component';

describe('ModeComponent', () => {
  let component: ModeComponent;
  let fixture: ComponentFixture<ModeComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ModeComponent]
    });
    fixture = TestBed.createComponent(ModeComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it(`modes defaults to: ['web', 'mobile', 'vr']`, () => {
    expect(component.modes).toEqual(['web', 'mobile', 'vr']);
  });
});
