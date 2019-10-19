import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveMockComponent } from './live-mock.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import {
  FormsModule,
  ControlContainer,
  FormControl,
  FormGroup
} from '@angular/forms';

// TODO fix this test
describe.skip('LiveMockComponent', () => {
  let component: LiveMockComponent;
  let fixture: ComponentFixture<LiveMockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LiveMockComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ControlContainer],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveMockComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
