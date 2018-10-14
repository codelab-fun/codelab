import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSetComponent } from './test-set.component';

describe('TestSetComponent', () => {
  let component: TestSetComponent;
  let fixture: ComponentFixture<TestSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
