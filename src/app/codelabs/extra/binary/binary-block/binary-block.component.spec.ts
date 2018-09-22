import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryBlockComponent } from './binary-block.component';

describe('BinaryBlockComponent', () => {
  let component: BinaryBlockComponent;
  let fixture: ComponentFixture<BinaryBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinaryBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
