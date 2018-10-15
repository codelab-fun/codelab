import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryParentComponent } from './binary-parent.component';

describe('BinaryParentComponent', () => {
  let component: BinaryParentComponent;
  let fixture: ComponentFixture<BinaryParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinaryParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
