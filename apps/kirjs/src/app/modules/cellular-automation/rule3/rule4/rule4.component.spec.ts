import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Rule4Component } from './rule4.component';

describe('Rule4Component', () => {
  let component: Rule4Component;
  let fixture: ComponentFixture<Rule4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Rule4Component]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Rule4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
