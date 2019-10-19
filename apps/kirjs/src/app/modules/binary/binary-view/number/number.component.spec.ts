import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberComponent } from './number.component';
import { BinaryParentComponent } from '../binary-parent/binary-parent.component';

describe('NumberComponent', () => {
  let component: NumberComponent;
  let fixture: ComponentFixture<NumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NumberComponent],
      providers: [BinaryParentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberComponent);
    component = fixture.debugElement.componentInstance;
    component.data = { value: 'mock_val' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
