import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MidiComponent } from './midi.component';

describe('MidiComponent', () => {
  let component: MidiComponent;
  let fixture: ComponentFixture<MidiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MidiComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
