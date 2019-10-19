import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorComponent } from './color.component';
import { BinaryParentComponent } from '../binary-parent/binary-parent.component';

describe('ColorComponent', () => {
  let component: ColorComponent;
  let fixture: ComponentFixture<ColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorComponent],
      providers: [BinaryParentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorComponent);
    component = fixture.debugElement.componentInstance;
    component.color = 'pink';
    component.data = {
      value: 'mock_value'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
