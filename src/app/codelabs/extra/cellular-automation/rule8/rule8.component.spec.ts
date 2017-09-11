import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Rule8Component } from './rule8.component';

describe('Rule8Component', () => {
  let component: Rule8Component;
  let fixture: ComponentFixture<Rule8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Rule8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Rule8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
