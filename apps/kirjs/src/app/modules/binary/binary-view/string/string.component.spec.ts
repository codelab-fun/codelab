import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringComponent } from './string.component';
import { BinaryParentComponent } from '../binary-parent/binary-parent.component';

describe('StringComponent', () => {
  let component: StringComponent;
  let fixture: ComponentFixture<StringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StringComponent],
      providers: [BinaryParentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringComponent);
    component = fixture.debugElement.componentInstance;
    component._data = 'some_data';
    component.showMeta = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
