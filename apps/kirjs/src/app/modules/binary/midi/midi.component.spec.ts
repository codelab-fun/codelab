import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiComponent } from './midi.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { BinaryParser } from '../parser/binary-parser';

// TODO Fix this test
describe.skip('MidiComponent', () => {
  let component: MidiComponent;
  let fixture: ComponentFixture<MidiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MidiComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidiComponent);
    component = fixture.debugElement.componentInstance;
    component.parser = new BinaryParser();
    component.binary = '010101';
    component.s = ['mock1', 'mock2'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
