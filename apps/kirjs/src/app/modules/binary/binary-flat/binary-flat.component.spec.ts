import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryFlatComponent } from './binary-flat.component';
import { BinaryParentComponent } from '../binary-view/binary-parent/binary-parent.component';

describe('BinaryFlatComponent', () => {
  let component: BinaryFlatComponent;
  let fixture: ComponentFixture<BinaryFlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BinaryFlatComponent],
      providers: [BinaryParentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryFlatComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
