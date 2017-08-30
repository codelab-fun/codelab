import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Rule3Component } from './rule3.component';

describe('Rule3Component', () => {
  let component: Rule3Component;
  let fixture: ComponentFixture<Rule3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Rule3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Rule3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
