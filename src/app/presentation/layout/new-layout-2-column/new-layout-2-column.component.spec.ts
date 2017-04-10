import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLayout2ColumnComponent } from './new-layout-2-column.component';

describe('NewLayout2ColumnComponent', () => {
  let component: NewLayout2ColumnComponent;
  let fixture: ComponentFixture<NewLayout2ColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLayout2ColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLayout2ColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
