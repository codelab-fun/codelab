import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitsComponent } from './bits.component';
import { BinaryParentComponent } from '../binary-parent/binary-parent.component';

describe('BitsComponent', () => {
  let component: BitsComponent;
  let fixture: ComponentFixture<BitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BitsComponent],
      providers: [BinaryParentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitsComponent);
    component = fixture.debugElement.componentInstance;
    component.data = { rawValue: 'mock_raw_data' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
