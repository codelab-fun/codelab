import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceComponent } from './race.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

// TODO fix this test
describe.skip('RaceComponent', () => {
  let component: RaceComponent;
  let fixture: ComponentFixture<RaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RaceComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceComponent);
    component = fixture.debugElement.componentInstance;
    component.path = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
