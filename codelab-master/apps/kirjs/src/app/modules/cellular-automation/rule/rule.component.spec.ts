import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleComponent } from './rule.component';
import { BoardComponent } from '../board/board.component';

describe('RuleComponent', () => {
  let component: RuleComponent;
  let fixture: ComponentFixture<RuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RuleComponent, BoardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
